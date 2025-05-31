
/************** Login Functions *******************/
(function() {
    var appUserLogin=angular.module('appUserLogin',[]);
    appUserLogin.controller('ctrlLogin',['$scope', '$http', '$log', function($scope, $http, $log){
//            alert('running');
        $scope.user = {};
        
        $scope.submitForm = function(){
//            $scope.showLoader=1;
//            $log.log($scope.user);
            $http({
                method  :   'POST',
                url     :   'php/login',
                data    :   $scope.user,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                /*alert(data.login_id);*/
                $log.log(data);
                $scope.showLoader=0;
                if(data.item_id == -1){
                    $scope.user.wrcred = "Incorrect Username/Password";
                    $scope.user.userid = "";
                    $scope.user.pass = "";
                }else{
                    
                    window.location.href="dashboard";
                }
                
            });
            /*alert('Login submitted ' + $scope.user.userid);*/
        };
    }]);
})();

/************** Dashboard Functions *******************/
(function() {
    var appUserDash=angular.module('appDashboard',['ui.bootstrap','ngAnimate']);
    
    appUserDash.directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    
    appUserDash.controller('ctrlDash',['$scope','$http','$log','$window',function($scope,$http,$log,$window)
    {
         /* alert('running');*/
        $scope.DIR = 'http://main.sewabhao.org/mfm/astro_asso/';
        $scope.showLoader=0;
        $scope.new_u=0;
        $scope.show_otp=0;
        $scope.hform = [];
        $scope.hform.user_id = 0;
        $scope.hform.bd_id = 0;
        $scope.exusers=[];
        $scope.mymodal=[];        
        $scope.mymodal.otpsec=0;
        $scope.mymodal.error='';
        $scope.showModal = function()
        {
            $scope.new_u=1;
        };
        $scope.submitForm = function()
        {            
            $scope.showLoader=1;
            $scope.hform.latitude = document.getElementById('latitude').value;
            $scope.hform.longitude = document.getElementById('longitude').value;
            $scope.hform.time_zone = document.getElementById('time_zone').value;
            
            /*$log.log("hform: ");
            $log.log($scope.hform);*/
   
             
             var formData = {
                "name"      :   $scope.hform.name,
                "email"     :   $scope.hform.email,
                "phone"     :   $scope.hform.phone,
                "in_gen"    :   $scope.hform.in_gen,
                "date"      :   $scope.hform.date,
                "month"     :   $scope.hform.month,
                "year"      :   $scope.hform.year,
                "hour"      :   $scope.hform.hour,
                "minu"      :   $scope.hform.minu,
                "latitude"  :   $scope.hform.latitude,
                "longitude" :   $scope.hform.longitude,
                "time_zone" :   $scope.hform.time_zone
             };
             $log.log("formdata: ");
            $log.log(formData);
            alert('save clicked');
            $http({
            method  : 'POST',
            url     : 'php/usr_enlist',
            data    : formData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $scope.showLoader=0;
                $scope.hform.user_id = data.user_id;  
                $scope.hform.bd_id = data.bd_id;
                $log.log(data);
                $scope.new_u=0;
                $scope.show_otp = 1;
            });         
        };
        $scope.submitOTP = function()
        {
            $scope.show_otp=0;
            $scope.showLoader=1;
            
            var formData = {
                "otp"       :   $scope.hform.otp,
                "user_id"   :   $scope.hform.user_id,
            };
            
            $http({
                method  :   'POST',
                url     :   'php/chk_otp',
                data    :   formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $scope.showLoader=0;
                window.location.href="user_details";
            });
        };
        $scope.getSearchUsers=function()
        {
            $log.log('started');
            $log.log($scope.usearchex);
            $http({
                method  :   'POST',
                url     :   'scripts/qfinder',
                data    :   {'con':'search_users','val':$scope.usearchex},
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $log.log('here');
                $scope.exusers=data;
                $log.log(data);
                $log.log($scope.exusers);
            });
        };
        var params =
        { 
            "action" : "ulist"
        };
        $http({
            method  :   'POST',
            url     :   'php/dashboard',
            data    :   params,
            headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data) {
            $scope.showLoader=0;
            $scope.enusers = data;
        });  
        $scope.goToDetails = function(bd_id)
        {
            /*$log.log("called function goToDetails");*/
            url = $scope.DIR+"user_details/"+btoa(bd_id);
            window.location.href = url;
        };
        $scope.get_bdet=function(prm)
        {
            if(confirm("By pressing yes you are confirming that the user is now connected with you"))
            {                
                var params={'con':'req_otp','val':prm};
                $scope.mymodal.user_id=prm;
                $scope.mymodal.msg='Requesting User Confirmation.';
                $http({
                method  :   'POST',
                url     :   'scripts/qfinder',
                data    :   params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) 
                {
                    $log.log(data);
                    if(data.ret=='true')
                    {
                        $scope.mymodal.msg='Please confirm the OTP sent to client';
                        $scope.mymodal.otpsec=1;
                    }
                    else
                    {
                        $scope.mymodal.msg='Some error occured. Please try again\n\n Possible Reasons : User Not Found / User is blocked.\n\nSolution : Create new user with seperate Contact Number';
                    }
                }); 
            }
        };
        
        $scope.checkOtp=function()
        {
                var params={'con':'check_otp','val1':$scope.mymodal.user_id,'val2':$scope.mymodal.otptxt};                
                $scope.mymodal.msg='Requesting User Confirmation.';
                $http({
                method  :   'POST',
                url     :   './scripts/qfinder',
                data    :   params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) 
                {   
                    if(data.ret=='a')
                    {
//                      $scope.mymodal.user_id=0;
                        var uid=$scope.mymodal.user_id;
                        $scope.mymodal.otptxt='';
                        $scope.mymodal.error='';
                        $scope.mymodal.success='OTP Confirmed. Redirecting...';
                        window.location.href='plans/'+btoa(uid);
                    }
                    else
                    {
                        $scope.mymodal.otptxt='';
                        $scope.mymodal.success='';
                        $scope.mymodal.error='OTP Confirmation Failed. Please Correct ...';
                    }
                }); 
        };
        $scope.pending=[];
        $scope.getPendingReport=function()
        {
            $scope.params = {
                "con"   :   "get_report",
                "type"  :   "pending"
            };

            $http({
                method  :   'POST',
                url     :   'scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data) {
                $log.log(data);
                $scope.pending=data;
            }); 
        };
        $scope.getPendingReport();
        $scope.getToServ=function(p1)
        {
            $scope.params = {
                "con"   :   "get_u_rep",
                "type"  :   "pending",
                "bd"    :   p1
            };
            alert(p1);
            $http({
                method  :   'POST',
                url     :   'scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data) {
                $log.log(data);
                if(data=='"success"')
                {
                    window.location.href='service_provider';
                }
                else
                {
                    alert('Some error Occured.Please contact support personal and tell the error code : '+p1);
                }
            }); 
        };
        
        
    }]);
})();
    /********************************* Astro Services Page **************************************/

(function() {
    var appUserDash=angular.module('appServ',[]);
    appUserDash.controller('ctrlServ',['$scope','$http','$log',function($scope,$http,$log){
        $log.log($scope.bd_id);
        $scope.params = {
            "action"    :   "get-fea-list",
            "bd_id"      :   $scope.bd_id
        };
   
        $http({
            method  :   'POST',
            url     :   '../php/services',
            data    :   $scope.params,
            headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
            $scope.showLoader=0;
            $scope.sub_list = data;
            $log.log(data);
        }); 
        
        $scope.get_user_details = function(){
            
            $scope.params = {
                "action"    :   "get-user-details",
                "bd_id"     :   $scope.bd_id
            };

            $http({
               method   :   'POST',
               url      :   '../php/services',
               data     :   $scope.params,
               headers  :   {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $scope.user_details = data;
            });
        };
        $scope.get_user_details();
        
        $scope.up_usage = function(sf_id, bd_id)
        {

            $scope.params = {
                "action"    :   "up-fea-usage",
                "sf_id"     :   sf_id,
                "bd_id"     :   bd_id
            };
            $http({
                method  :   'POST',
                url     :   '../php/services',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            });
        };  
        
    }]);
  
})();

/*********************************  planes page  *************************************/

(function() {
    var appPlans=angular.module('appPlans',[]);
    appPlans.directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
    appPlans.controller('ctrlPlans',['$scope','$http','$log',function($scope,$http,$log)
    {            
        $scope.mfmWallsuc='';
        $scope.mfmWallErr='';
        $scope.uid=0;
        $scope.tab=1;        
        $scope.ap=[];       
        $scope.p_sub=0;
        $scope.ap.bd_id=0;
        $scope.sub_list=[];        
        $scope.ps_paymode=0;
        $scope.item_desc=-1;
        $scope.subXs=[];
        $scope.ps1=0;
        $scope.asp=0;
        $scope.wallet=[];
        $scope.item=[];
        $scope.discount=[];
        $scope.discount.dis=0;
        $scope.discount.ap=0;
        $scope.total_pay=0;
        $scope.discount.cou='';
        $scope.cart_tab=[];
        $scope.cart_main=[];
        $scope.updata=0;
        $scope.cntCart=0;
        $scope.purFea =[];
        $scope.conSer=0;
        $scope.conItem=[];
        $scope.otpTxt=0;
        $scope.otpx=0;
        document.getElementById('dl_load').style.display='none';
        $scope.setAll=function(data,d2)
        {      
            document.getElementById('dl_load').style.display='none';
            $scope.uid=data;
            $scope.asp=d2;
            $scope.getBD(data);
            $scope.getSubs();
            $scope.getPurFea();
            $scope.getOtherServices();
            $scope.getAddedSer();
        };        
        $scope.getBD=function(data)
        {
            $scope.updata=1;
            $http({
            method  : 'POST',
            url     : '../scripts/qfinder',
            data    : {"con":'all_profiles',"type":$scope.uid},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
//                $log.log(data);
                $scope.user_pro=data;
                $scope.updata=0;
            });
//            $log.log($scope.updata);
            
        };        
        $scope.getSubscriptions=function()
        {
            $scope.params = {
            "con"    :   "get_act_sub",
            "uid"      :   $scope.uid
            };
//            alert($scope.ap.bd_id);
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data) {
//                alert('ok');
//                $scope.showLoader=0;
                $log.log('subs_main>>');
                $log.log(data);
                $log.log('subs_main');
                if(data==[])
                {
//                    alert();    
                    $scope.sub_list =[];
                }
                else
                {
                    $scope.sub_list = data;
                }
                
            });
        };
        $scope.getPurFea=function()
        {
            $scope.params = {
            "con"    :   "get_pur_fea",
            "uid"      :   $scope.uid
            };
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data) {
//                alert('ok');
//                $scope.showLoader=0;
                $log.log('subs..');
                $log.log(data);
                $log.log('subs..');
                if(data==[])
                {
//                    alert();    
                    $scope.purFea =[];
                }
                else
                {
                    $scope.purFea = data;
                }
                
            });
        };
        $scope.getOtherServices=function()
        {
            $scope.params = {
            "con"    :   "get_gen_out_fea",
            "uid"      :   $scope.uid,
            "type"      :   "astro"
            };
//            ($scope.ap.bd_id);
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data) {
//                alert('ok');
//                $scope.showLoader=0;
                $log.log('subsxxxxxx');
                $scope.othFea = data;
                $log.log(data);
            });
        };        
        $scope.add2c=function(d1,d2,d3)
        {
            $scope.updata=1;
//            $log.log(d2);
//                $log.log('/////');                
                $log.log(d3);
//                $log.log('/////');                
            if(d1!='coupon')
            {
                if(d1=='puja')
                {
                    if(angular.isDefined($scope.uaddr[$scope.addrsel]['udl_id']))
                    {
                        var x=document.getElementById('puja_dt').value; 
                        var dt=x.replace(/[/]+/g,"-"); 
    //                    x=x.repl
    //                    alert();
    //                    d3=$scope.fea_det[0].puja_pack[0].pp_id;
                        $scope.params = {
                        "con"       :   "add2c_item",
                        "uid"       :   $scope.uid,
                        "type"      :   d1,
                        'item'      :   $scope.selAdnItm,
                        'subfea'    :   d2+","+dt+","+$scope.sel_city_puja+","+$scope.puja_type+","+$scope.pt_radio+","+$scope.uaddr[$scope.addrsel]['udl_id']
                        };
//                        $log.log('Params');
                        $log.log($scope.params);
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.params,
                            headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                        }).success(function(data) 
                        {
    //                        $scope.alerts('alertsuc','Product added to cart...');
//                            $log.log(data);
                            $scope.updata=0;
                            $scope.show_puja=false;
                            $scope.modalShown='';
                            $scope.showPrice();
                            $scope.modalWin=false;
                            $scope.fea_det=[];
                            $scope.getCartUpdate();
                        });
                    }
                    else
                    {
                        alert('Please select an ADDRESS');
                    }
                }
                else
                {
                    $scope.params = {
                    "con"       :   "add2c_item",
                    "uid"       :   $scope.uid,
                    "type"      :   d1,
                    'item'      :   d2.fea_id,
                    'subfea'    :   d3
                    };
                    $log.log($scope.params);
    //                alert(d2.fea_id);
        //            ($scope.ap.bd_id);
                    $http({
                        method  :   'POST',
                        url     :   '../scripts/qfinder',
                        data    :   $scope.params,
                        headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) 
                    {
                        $log.log(data);
                        $scope.updata=0;
                        $scope.getCartUpdate();
                    });
                }
            }
            else
            {
                $scope.params = {
                "con"       :   "add2c_item",
                "uid"       :   $scope.uid,
                "type"      :   d1,
                'item'      :   document.getElementById('coupon2').value
                };
//                alert(d2.fea_id);
    //            ($scope.ap.bd_id);
                
                $http({
                    method  :   'POST',
                    url     :   '../scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
                {
                    $log.log(data);
                    $scope.updata=0;
                    $scope.getCartUpdate();
                });
                
            }
            
            
        };                
        $scope.getSubs=function()
        {
            $scope.params = {
            "con"    :   "get_all_packs",
            "item"      :   0
            };
            $http({
            method  : 'POST',
            url     : '../scripts/qfinder',
            data    : $scope.params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(datax) {                   
                $scope.gensubpacks=datax;
                $log.log($scope.gensubpacks);
                $log.log('$scope.gensubpacks');
            });
        };        
        $scope.get_user_details = function()
        {            
            $scope.params = {
                "action"    :   "get-user-details",
                "bd_id"     :   $scope.bd_id
            };

            $http({
               method   :   'POST',
               url      :   '../php/services',
               data     :   $scope.params,
               headers  :   {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                $scope.user_details = data;
            });
        };
        $scope.get_user_details();
        {
            $scope.params = {
            "action"    :   "get-fea-list",
            "bd_id"      :   $scope.bd_id
        };
   
        $http({
            method  :   'POST',
            url     :   '../php/services',
            data    :   $scope.params,
            headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
            $scope.showLoader=0;
            $scope.sub_list = data;
            $log.log(data);
        }); 
        };
        $scope.up_usage = function(sf_id, bd_id)
        {
            $scope.params = {
                "action"    :   "up-fea-usage",
                "sf_id"     :   sf_id,
                "bd_id"     :   bd_id
            };
            $http({
                method  :   'POST',
                url     :   '../php/services',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            });
        };  
        $scope.changeTab=function(tab)
        {
            $scope.tab=tab;
            for(var i=1;i<6;i++)
            {
                $("#tab"+i).removeClass("activated");
            }
            $("#tab"+tab).addClass("activated");
        };        
        $scope.mainSet=function(dt1,dt2)
        {
            $scope.ap.bd_id=dt1;
            $scope.ap.p_name=dt2;            
        };        
        $scope.set_show=function(data)
        {
            if($scope.item_desc==data)
            {
                $scope.item_desc=-1;
            }
            else
            {
                $scope.item_desc=data;
            }
        };        
        $scope.buySub=function(data)
        {
            $scope.p_sub=1;
            $scope.ps1=1;
            $scope.subXs=data;
            $log.log($scope.subXs);
        };
        $scope.conPurSub=function(data)
        {            
            if(data==1)
            {
                if(confirm("Are you sure you want to Continue?"))
                {
                    $scope.ps1=data+1;   
                    $scope.getWallet();
                    $scope.getDiscount('gen');
                }
            }
        };
        $scope.getWallet=function()
        {
            $scope.wallet=[];
            $scope.params = 
            {
                "con"    :   "get_wallet",
                "uid"       :   $scope.uid
            };
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    
                    $scope.wallet=data;
                    if(data=={})
                    {
                        $scope.wallet.wallet_amount=0;
                    }
                    $log.log($scope.wallet);
                    $scope.getDiscount('gen','');
            }); 
        };
        $scope.getDiscount=function(d1,d2)
        {            
            if(d1=='cou')
            {
                $scope.discount.cou='';
                $scope.discount.dis=0;                
                $scope.params = 
                {
                    "con"       :   "validate_coupon",
                    "uid"       :   $scope.uid,
                    "cou"       :   document.getElementById('coupon1').value,
                    "subs"      :   $scope.subXs.sub_id,
                    'type'      :   d2
                };
                $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
                {
                    $log.log(data);
                    if(data.success=='false')
                    {
                        
                        $scope.discount.cou='';
                        $scope.discount.dis=0;
                    }
                    else if(data.success=='true')
                    {
                        $scope.discount.cou=data.coupon;
//                        alert($scope.discount.cou);
                        $scope.perx=$scope.subXs.sub_price * data.percentage/100;
                        $scope.discount.dis=0;
                        if(data.max_dis > $scope.perx )
                        {
                            $scope.discount.dis=$scope.perx;
                        }
                        else
                        {
                            $scope.discount.dis=data.max_dis;
                        }
                        $scope.getDiscount('gen','');
                    }
                });
            }
            else if(d1=='gen')
            {
                
                $scope.discount.ap=0;                
                if($scope.wallet.wallet_amount >= $scope.subXs.amx_de)
                {
                    $scope.discount.ap=$scope.subXs.amx_de;                    
                }
                else if($scope.wallet.wallet_amount<$scope.subXs.amx_de)
                {
                    $scope.discount.ap=$scope.wallet.wallet_amount;
                }
                else if($scope.wallet.wallet_amount==0)
                {
                    $scope.discount.ap=0;
                }                    
            }
            $scope.to_pay= parseInt($scope.discount.ap)+parseInt($scope.discount.dis);
            $scope.total_pay=$scope.subXs.sub_price-$scope.to_pay;
        }
        $scope.goBack=function(data)
        {
            $scope.ps1=data;               
        };        
        $scope.getWalletPay=function(data)
        {
            if(data=='subs')
            {
                $scope.params = {
                    "con"   :   "purchase_subs",
                    "uid"   :   $scope.uid,
                    "sub"   :   $scope.subXs.sub_id,
                    "aud"   :   $scope.asp
                };
                $log.log($scope.params);
                $http({
                    method  :   'POST',
                    url     :   '../scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        $scope.mfmWallsuc=data.success;
                        $scope.mfmWallErr=data.msg;
                        $scope.mfmWallErrC=data.code;
                        if(data.wa)
                        {
                            $scope.mfmWallwa=data.wa;
                        }
                }); 
            }
        }        
        $scope.checkPayOtp=function(data)
        {
            if(data=='subs')
            {
                $scope.params = {
                    "con"   :   "purchase_subs_check",
                    "uid"   :   $scope.uid,
                    "sub"   :   $scope.subXs.sub_id,
                    "aud"   :   $scope.asp,
                    "otp"   :   document.getElementById('txt_s_otp').value
                };
                $log.log($scope.params);
                $http({
                    method  :   'POST',
                    url     :   '../scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        $log.log(data);
                }); 
            }
        }
        $scope.purSub=function()
        {
            if($scope.payMode==0)
            {
                alert('Please select mode of payment');
            }
            else
            {
                $scope.params = {
                    "con"   :   "final_sub_purchase",
                    "uid"   :   $scope.uid,
                    "sub"   :   $scope.subXs.sub_id,
                    "aud"   :   $scope.asp,
                    "pay"   :   $scope.payMode,
                    "cou"   :   $scope.discount.cou
                };
                $log.log($scope.params);
                $http({
                    method  :   'POST',
                    url     :   '../scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        if(data.success=='true')
                        {
                            $scope.getPurFea();
                        }
                        $log.log(data);
                });
            }
        };
        $scope.getCartUpdate=function()
        {
            $scope.cntCart=0;
            $scope.updata=1;
            $scope.tab=3;
            $scope.params = 
            {              
                "con" :   "updateCart"
            };
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.cart_main=data;
                    $scope.c_gt=0;
                    $scope.c_total=0;
                    $scope.c_cou='';
                    $scope.c_dis=0;
                    $scope.c_ap=0;
                    $log.log(data);
                    angular.forEach($scope.cart_main.cart, function(value, key) {
                       $scope.cntCart=$scope.cntCart+1;
                      if(value.item_type!='coupon')
                      {
                            $scope.c_total=parseFloat($scope.c_total)+parseFloat(value.item_total);
                      }
                      else
                      {
                            $scope.c_dis=parseFloat(value.item_total);
                      }
                      $log.log($scope.c_total);
                    });
                        $scope.c_gt=$scope.c_total-$scope.c_dis;
                        $scope.c_dis=0;
                        $scope.updata=0;
            });            
        };
        $scope.place_final_order=function()
        {
            $scope.updata=1;
            $scope.params = 
            {              
                "con"   :   "place_main_order"
            };            
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    $log.log(data);
                    $scope.updata=0;
                    $scope.changeTab(4);
                    $scope.getPurFea();
                    
                });            
        };
        $scope.getAddedSer=function()
        {
            $scope.params = 
            {              
                "con"   :   "get_ser",
                "uid"   :   $scope.uid
            };        
//            alert(name);
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    $log.log('added serv');
                    $log.log(data);
                    $log.log('added serv');
                    $scope.conItem=data;                                      
            });    
        }
        $scope.addService=function(id,name)
        {
//        $scope.otpx=1;
//            $scope.conItem=[] ;            
            $scope.updata=1;
            $scope.params = 
            {              
                "con"   :   "add_ser_ord",
                "fea"   :   id,
                "fea_name"   :   name,
                "uid"   :   $scope.uid
            };        
            alert(name);
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    $log.log(data);
                    $scope.conItem=data;                                      
                });    
                $scope.updata=0;
        };
        $scope.placeServices=function()
        {
            if(confirm("Proceed with this services!!\n\The user will receive an OTP for confirmation of the items."))
            {
                $scope.otpx=1;
                $scope.otpTxt=0;
                $scope.params = 
                {
                    "con"   :   "confirm_services"
                };        
                alert(name);
                $http({
                    method  :   'POST',
                    url     :   '../scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        $log.log(data);
                        if(data.ret=='"true"')
                        {
                            $scope.otpTxt=1;
                        }
                });    
            }
        };        
        $scope.conOtp=function()
        {
//            $scope.idxCon=document.getElementById('idx').value;
            $scope.params = 
            {              
                "con"   :   "con_OTP",
                "otp"   :   document.getElementById('otp_txt').value
            };        
//            alert('name');
//            alert('conOtp');
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {                        
                    $log.log(data);
                    if(data=='"a"')
                    {
                        $scope.setServices();
                    }
            });    
        };
        $scope.setServices=function()
        {
            alert('setServices Started');
            $scope.updata=1;
            $scope.params = 
            {              
                "con"   :   "set_services",
                "bd"    :   $scope.ap.bd_id
            };        
//            alert(name);
            $http({
                method  :   'POST',
                url     :   '../scripts/qfinder',
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    $log.log(data);
                    $scope.updata=0;
                    window.location.href='service_provider';                    
            }); 
        };
        
        
        
    }]);
  
})();

(function() {
    var appServ=angular.module('appServ', ['ngSanitize']);
    appServ.directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
    
    appServ.directive('mainArea', function() {
        return {
            restrict: "E",
            template: "<div>"+
                "<div id='mainDiv'> </div>" +
                "<button data-ng-click='append()'>Add</button>" +
            "</div>",
            controller: function($scope, $element, $attrs) {
                $scope.append = function() {
                    var p = angular.element("<p />");
                    p.text("Appended");
                    $element.find("div").append(p);
                }
            }
        }
    });
    
    appServ.controller('ctrlServ',['$scope','$http','$log',function($scope,$http,$log){
            document.getElementById('dl_load').style.display='none';
            $scope.displayx=[];
            $scope.bd_id='';
            $scope.au='';
            $scope.bd=[];
            $scope.mainApidata=[];
            $scope.conItem=[];
            $scope.ses='';
            $scope.chartData=[];
            $scope.predict=
            {              
                 "Finance"   :   "",
                 "Work"   :   "",
                 "Career"   :   "",
                 "Property"   :   "",
                 "Partnership"   :   "",
                 "Marriage"   :   "",
                 "Family"   :   "",
                 "Children"   :   "",
                 "Health"   :   "",
                 "Travel"   :   "",
                 "Rajyogas"   :   "",
                 "Doshas"   :   "",
                 "Upay"   :   ""
            };
            $scope.setAll=function(uid,auid,ses)
            {
                $scope.bd_id=uid;
                $scope.au=auid;
                $scope.ses=ses;
                $scope.getBd(uid);
//                $scope.getAddedSer(uid);
                
                
//                $scope.setAllApi(str_api);
            };
            $scope.getBd=function(uid)
            {
                $scope.updata=1;
                $http({
                method  : 'POST',
                url     : 'scripts/qfinder',
                data    : {"con":'get_bd',"type":uid},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    
                    $scope.bd=data;
//                    $log.log($scope.bd);
//                    $log.log('>>>>>>>>');
                    $scope.updata=0;
                    $scope.refresh_ser();
                    
                });
            };
            $scope.showapiuser = function(value) 
            {
                $scope.x1=[]
                $scope.params={"con":value};
                $http({
                method  : 'POST',
                url     : 'scripts/qfinder.php',
                data    : $scope.params,
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) 
                {
//                    $scope.mainApidata[value].val=1;
                    $scope.tempid='mn'+value;
                    document.getElementById('mn'+value).style.display='block';
                    document.getElementById('ac'+value).innerHTML=data;
//                    document.getElementById($scope.tempid).className='box-primary';
                    document.getElementById($scope.tempid).focus();
                });
            };
            
            $scope.horoLoader=function(xtype)
            {
                $scope.updata=1;
                
                $http({
                method  : 'POST',
                url     : 'scripts/qfinder',
                data    : {"con":'get_horo','type':xtype},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $log.log('returned horo'+xtype);
                    $log.log(data);
                    $scope.tempid='mn'+'horo_chart';
                    document.getElementById('mn'+'horo_chart').style.display='block';
                    $scope.chartData=data;
                    var options = {
                    lineColor : '#666',
                    planetColor : '#000',
                    signColor : '#000',
                    width : $('.UI-II').width()
                    };
                    drawNorthChart(getPlanetArray(data),getSignArray(data), options,'#moonChart');
                    $scope.updata=0;
                });
//                drawNorthChart(getPlanetArray(<?php echo $data_encoded;?>), getSignArray(<?php echo $data_encoded;?>), options,'#northChart');
//                drawSouthChart(getSignPlanetArray(<?php echo $data_encoded;?>),getSignArray(<?php echo $data[0]['sign'];?>), options,'#southChart');
//                drawNorthChart(getPlanetArray(<?php echo $sun_chart;?>), getSignArray(<?php echo $sun_chart;?>), options,'#sunChart');
//                drawNorthChart(getPlanetArray(<?php echo $moon_chart;?>), getSignArray(<?php echo $moon_chart;?>), options,'#moonChart');
//                drawNorthChart(getPlanetArray(<?php echo $chalit;?>), getSignArray(<?php echo $chalit;?>), options,'#chalitChart');
//                drawNorthChart(getPlanetArray(<?php echo $navamansha;?>), getSignArray(<?php echo $navamansha;?>), options,'#navamanshaChart');
            };
            $scope.getPlanet=function(planet)
            {
                $scope.tempid='';
                $scope.params={"con":'general_house_report','planet':planet};
                $http({
                method  : 'POST',
                url     : 'scripts/qfinder.php',
                data    : $scope.params,
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) 
                {
                    $log.log(data);
//                    $scope.mainApidata[value].val=1;
                    $scope.tempid='mngeneral_house_report';
                    document.getElementById('acgeneral_house_report').innerHTML=data;
                    document.getElementById($scope.tempid).focus();
                });
            };
            $scope.myPlanet = function() 
            {
                $scope.displays=[];
                $scope.planet1='sun';
                $scope.params={"con1":$scope.planet1};
                $http({
                    method  : 'POST',
                    url     : 'scripts/qfinder1.php',
                    data    : $scope.params,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(function(data) {
                    $log.log(data);
                    $scope.displays=data;
                });
            };
            $scope.setInnerData=function(indexx)
            {
                
                $scope.idbase="apicd"+indexx;
                $log.log('set'+$scope.idbase);
                document.getElementById($scope.idbase).innerHTML=$scope.displayx[indexx].datax;
            };
            $scope.setAllApi=function(data1)
            {
//                $scope.valxz=JSON.parse(data1);
//                $log.log($scope.valxz);
            };
            $scope.getAddedSer=function(uid)
            {
                $scope.params = 
                {              
                    "con"   :   "get_ser",
                    "uid"   :   uid
                };        
    //            alert(name);
                $http({
                    method  :   'POST',
                    url     :   'scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        $log.log('added serv');
                        $log.log(data);
                        $log.log('added serv');
                        $scope.conItem=data;                                      
                        $scope.getSetPre($scope.conItem)
                });    
            };
            $scope.getSetPre=function(uid)
            {
                $scope.params = 
                {              
                    "con"   :   "get_set_pre",
                    "ses"   :   $scope.ses
                };        
    //            alert(name);
                $http({
                    method  :   'POST',
                    url     :   'scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        $log.log('added pre');
                        $log.log(data);
                        $log.log('added pre');
                        angular.forEach(data, function(value, key) 
                        {
                           $scope.predict[value.predic_title]=value.predict_body;
                        });
//                        $scope.conItem=data;                                      
                });    
            };
            $scope.savePredict=function(ptype)
            {
//                alert(ptype);
                $scope.params = 
                {              
                    "con"   :   "set_predict",
                    "ses"   :   $scope.ses,
                    "type"  :   ptype,
                    "bd"    :   $scope.bd.bd_id,
                    "item"   :   document.getElementById(ptype).value
                };    
                $log.log($scope.params);
//                alert(document.getElementById(ptype).value);
                $http({
                    method  :   'POST',
                    url     :   'scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) {
                        if(data.error=='false')
                        {
                            alert(data.item);
                        }
                });  
            };
            $scope.setConsumed=function(item)
            {
                $scope.params = 
                {              
                    "con"   :   "set_consumed",
                    "ses"   :   $scope.ses,
                    "item"  :   item
                };    
//                alert();
//                $log.log($scope.params);
//                alert(document.getElementById(ptype).value);
                $http({
                    method  :   'POST',
                    url     :   'scripts/qfinder',
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) 
                    {
                        $log.log(data);
                        if(data.error_code==0)
                        {
                            var svg = '<div class="alertsuc"><h4><i class="icon fa fa-ban"></i> Alert!</h4><span>'+data.item+'</span><div align="right"><div class="btn btn-flat-white">Close</div></div></div>';
//                            $scope.count=0;
//                            angular.forEach($scope.conItem, function(value, key) {                                
//                                if(value.item==item)
//                                {
//                                    $scope.conItem[$scope.count]['stat']='completed';
//                                }
//                                $scope.count=$scope.count+1;
//                            });
                        }
                        if(data.error_code!=0)
                        {
                            var svg = '<div class="alertdanger"><h4><i class="icon fa fa-ban"></i> Alert!</h4><span>'+data.item+'</span><div align="right"><div class="btn btn-flat-white">Close</div></div></div>';
                        }
                        $scope.refresh_ser();
                        $scope.getAddedSer($scope.bd.user_id);
                        var div_alert = angular.element(document).find('ab').eq(0);
                        div_alert.prepend(svg);
                        $log.log($scope.conItem);
                    });
            };            
            $scope.refresh_ser=function()
            {
                $scope.params1 = 
                        {              
                            "con"   :   "get_u_rep",
                            "type"  :   "pending",
                            "bd"    :   $scope.bd.bd_id
                        };                       
                $http({
                        method  :   'POST',
                        url     :   'scripts/qfinder',
                        data    :   $scope.params1,
                        headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                        }).success(function(data1) 
                        {
                            $scope.getAddedSer($scope.bd.user_id);                            
                        });
            };
            
            
            
            
    }]);


  
})();

function caller_horo(data)
{
    
}
/****************
 * ***********
 * ***********
 * ***********
 * ***********
 *    starting of main page content 
 * ***********
 * ***********
 * ***********
 * ***********
 * ***********
 * ***********
 *******************/

(function() {
    var appIndex=angular.module('appIndex',['ui.bootstrap','angularUtils.directives.dirPagination','ngMaterial',"ui.bootstrap.modal",'ADM-dateTimePicker']);
    appIndex.filter('languFilter',function(){        
        return function(val,lang){
            var out='';
            var hi=[	{"HOME":"घर"},	{"ASTROLOGY":"ज्योतिष"},	{"NUMEROLOGY":"अंकज्योतिष"},	{"MY GURU":"मेरा गुरु"},	{"MY DHARMA":"मेरा धर्म"},	{"FESTIVALS":"त्योहारों"},	{"PANCHANG":"पंचांग"},	{"VIDEOS":"वीडियो"},	{"BLOGS":"ब्लॉग"},	{"LOG IN":"लॉग इन करें"},	{"Today's Forecast":"आज के पूर्वानुमान"},	{"Recommended for You":"आपके लिए अनुशंसित"},	{"Today's Panchang":"आज का पंचांग"},	{"Aries":"मेष"},	{"aquarius":"कुंभ राशि"},	{"Pisces":"मीन राशि"},	{"Capricornus":"मकर"},	{"Taurus":"वृषभ"},	{"Gemini":"मिथुन राशि"},	{"Virgo":"कन्या"},	{"Libra":"तुला"},	{"Cancer":"कैंसर"},	{"Leo":"लियो"},	{"Scorpius":"स्कॉर्पियस"},	{"Sagittarius":"धनु"},	{"Astrology Quick Access":"ज्योतिष त्वरित पहुंच"},	{"Puja Quick Access":"पूजा त्वरित पहुंच"},	{"Guru Quick Access":"गुरु त्वरित पहुंच"},	{"Family Business Report":"पारिवारिक व्यवसाय रिपोर्ट"},	{"New Born Report":"नई जन्म रिपोर्ट"},	{"Startup Report":"स्टार्टअप रिपोर्ट"},	{"Factory Report":"फैक्टरी रिपोर्ट"},	{"Meetings & Travel":"बैठकें और यात्रा"},	{"know more":"अधिक जानिए"},	{"Astro Locator":"एस्ट्रो लोकेटर"},	{"Temple Locator":"मंदिर लोकेटर"},	{"Ashram Locator":"आश्रम लोकेटर"},	{"Gemstore Locator":"रत्न गैलरी लोकेटर"},	{"Show":"दिखाना"},	{"LOGIN":"लॉग इन करें"},	{"finance":"वित्त"},	{"WORK":"काम"},	{"CAREER":"कैरियर"},	{"PROPERTY":"संपत्ति"},	{"PARTNERSHIP":"साझेदारी"},	{"MARRIAGE":"शादी"},	{"FAMILY":"परिवार"},	{"CHILDREN":"परिवार"},	{"HELTH":"स्वास्थ्य"},	{"TRAVEL":"यात्रा"},	{"SHOW DETAILS":"प्रदर्शन का विवरण"},	{"Upcoming puja":"आगामी पूजा"},	{"Ganesh Puja":"गणेश पूजा"},	{"Laxmi Puja":"लक्ष्मी पूजा"},	{"Saraswati Puja":"सरस्वती पूजा"},	{"Basanti Puja":"बसंत पूजा"},	{"Festival puja":"महोत्सव पूजा"},	{"Durga Puja":"दुर्गा पूजा"},	{"Biswakarma Puja":"विश्वकर्मा पूजा"},	{"Annya Puja":"अन्न पूजा"},	{"GRAH PUJA":"ग्रेह पुजा"},	{"Manasa Puja":"मनसा पूजा"},	{"Shakti Puja":"शक्ति पूजा"},	{"MARRIAGE PUJA":"शादी पुजा"},	{"Kali Puja":"काली पूजा"},	{"NAVRATRI PUJA":"नववरात्री पुजा"},	{"BLACK MAGIC":"काला जादू"},	{"PERSONAL PUJA":"व्यक्तिगत पुजा"},	{"SINDUR PUJA":"सिंडुर पुजा"},	{"NAZAR PUJA":"नाज़र पुजा"},	{"CORPORATE PUJA":"कॉरपोरेट पुजा"},	{"ANTIM PUJA":"एंटीम पुजा"},	{"Sunrise":"सूर्योदय"},	{"Sunset":"सूर्य का अस्त होना"},	{"Moonrise":"चंद्रमा"},	{"Moonset":"चंद्रमा"},	{"Sun Sign":"कुण्डली"},	{"Moon Sign":"राशि"},	{"Ritu":"रितु"},	{"Ayana":"अयाना"},	{"Inauspicious Period":"अशुभ अवधि"},  	{"Lunar Month":"चंद्र मास"},	{"Tithi":"तिथी"},	{"Yog":"योग"},	{"Nakshatra":"नक्षत्रा"},	{"Karan":"करन"},	{"Abhijit Muhurta":"अभिजीत मुहूर्ता"},	{"Shaka Samvat":"शक संवत"},	{"Vikram Samvat":"विक्रम संवत"},	{"Port Blair":"पोर्ट ब्लेयर"},	{"Adilabad":"आदिलाबाद"},	{"Adoni":"अदोनी"},	{"Alwal":"आलवाल"},	{"Anakapalle":"अनकापल्ले"},	{"Anantapur":"अनंतपुर"},	{"Bapatla":"बापतला"},	{"Belampali":"बेलम्पाली"},	{"Bhimavaram":"भीमवरम"},	{"Bhongir":"भोंगिर"},	{"Bobbili":"बोब्बिली"},	{"Bodhan":"बोधन"},	{"Chilakalurupet":"चिलकलुरुपेट"},	{"Chinna Chawk":"चिन्ना चाक"},	{"Chirala":"चिराला"},	{"Chittur":"चित्तूर"},	{"Cuddapah":"कडप्पा"},	{"Dharmavaram":"धर्मावरम"},	{"Dhone":"धोने"},	{"Eluru":"एलुरु"},	{"Gaddiannaram":"गद्दीनाराम"},	{"Gadwal":"गडवाल"},{"Gajuwaka":"गजुवाका"},	{"Gudivada":"गुडिवाडा"},	{"Gudur":"गुडुर"},	{"Guntakal":"गुंटकाल"},	{"Guntur":"गुंटूर"},	{"Hindupur":"हिन्दुपुर"},	{"Hyderabad":"हैदराबाद"},	{"Kadiri":"कादिरी"},	{"Kagaznagar":"कागाजनगर"},	{"Kakinada":"काकीनाडा"},	{"Kallur":"कल्लूर"},	{"Kamareddi":"कामरेड्डी"},	{"Kapra":"कपरा"},	{"Karimnagar":"करीमनगर"},	{"Karnul":"करनाल"},	{"Kavali":"कवली"},	{"Khammam":"खम्मम"},	{"Kodar":"कोदर"},	{"Kondukur":"कोंडुकुर"},	{"Koratla":"कोराताला"},	{"Kottagudem":"कोट्टागुडेम"},	{"Kukatpalle":"कुक्कटपल्ली"},	{"Lalbahadur Nagar":"लालबाहदुर नगर"},	{"Machilipatnam":"मछलीलीपट्टनम"},	{"Mahbubnagar":"महबूबनगर"},	{"Malkajgiri":"मलकजगिरी"},	{"Mancheral":"मंचेरल"},	{"Mandamarri":"मंडमार्री"},	{"Mangalagiri":"मंगलागिरी"},	{"Markapur":"मार्कपुर"},	{"Miryalaguda":"मिरियालागुडा"},	{"Nalgonda":"नालगोंडा"},	{"Nandyal":"नंदील"},	{"Narasapur":"नरसपुर"},	{"Narasaraopet":"नरसरावपेट"},	{"Nellur":"नेल्लोर"},	{"Nirmal":"निर्मल"},	{"Nizamabad":"निजामाबाद"},	{"Nuzvid":"नजविद"},	{"Ongole":"ओंगोल"},	{"Palakollu":"पालकोल्लू"},	{"Palasa":"पलासा"},	{"Palwancha":"पलवांचा"},	{"Patancheru":"पैटेंशेरु"},	{"Piduguralla":"पीगुगुल्लला"},	{"Ponnur":"पोन्नूर"},	{"Proddatur":"प्रोड्डेट"},	{"Qutubullapur":"कुतुबुल्लापुर"},	{"Rajamahendri":"राजमहन्दी"},	{"Rajampet":"राजपेट"},	{"Rajendranagar":"राजेंद्रनगर"},	{"Ramachandrapuram":"रामचंद्रपुराम"},	{"Ramagundam":"रामगुंडम"},	{"Rayachoti":"रायचोटी"},	{"Rayadrug":"रायड्रग"},	{"Samalkot":"समालकोट"},	{"Sangareddi":"संगारेड्डी"},	{"Sattenapalle":"सटेनापल्ले"},	{"Serilungampalle":"सेरिलिंगमपल्ली"},	{"Siddipet":"सिद्धिपेट"},	{"Sikandarabad":"सिकंदराबाद"},	{"Sirsilla":"सिरसिला"},	{"Srikakulam":"श्रीकाकुलम"},	{"Srikalahasti":"श्रीकालहस्ती"},	{"Suriapet":"सूरीपेट"},	{"Tadepalle":"ताडेपल्ले"},	{"Tadepallegudem":"ताडेपल्लेग्यूडेम"},	{"Tadpatri":"ताड़पत्री"},	{"Tandur":"तंदूर"},	{"Tanuku":"तनुकू"},	{"Tenali":"तेनाली"},	{"Tirupati":"तिरुपति"},	{"Tuni":"तुनी"},	{"Uppal Kalan":"उप्पल कलान"},	{"Vijayawada":"विजयवाड़ा"},	{"Vinukonda":"विनुकोंडा"},	{"Visakhapatnam":"विशाखापत्तनम"},	{"Vizianagaram":"विजयनगरम"},	{"Vuyyuru":"वूयुरु"},	{"Wanparti":"वानपार्टी"},	{"Warangal":"वारंगल"},	{"Yemmiganur":"यममिगनुर"},	{"Itanagar":"इटानगर"},	{"Barpeta":"बारपेटा"},	{"Bongaigaon":"बोंगाईगांव"},	{"Dhuburi":"धुबरी"},	{"Dibrugarh":"डिब्रूगढ़"},	{"Diphu":"दिफू"},	{"Guwahati":"गुवाहाटी"},	{"Jorhat":"जोरहाट"},	{"Karimganj":"करीमगंज"},	{"Lakhimpur":"लखीमपुर"},	{"Lanka":"लंका"},	{"Nagaon":"नागाँव"},	{"Sibsagar":"सिबसागर"},	{"Silchar":"सिलचर"},	{"Tezpur":"तेज़पुर"},	{"Tinsukia":"तिनसुकिया"},	{"Alipur Duar":"अलीपुर द्वार"},	{"Arambagh":"अराबाग"},	{"Asansol":"आसनसोल"},	{"Ashoknagar Kalyangarh":"अशोकनगर कल्याणगढ़"},	{"Baharampur":"बहरामपुर"},	{"Baidyabati":"बैद्यबाटी"},	{"Baj Baj":"बज बज"},	{"Bally":"बाली"},	{"Bally Cantonment":"बाली छावनी"},	{"Balurghat":"बालूरघाट"},	{"Bangaon":"बंगाँ"},	{"Bankra":"बैंकरा"},	{"Bankura":"बंकूरा"},	{"Bansbaria":"बंसबारिया"},	{"Baranagar":"बारानगर"},	{"Barddhaman":"बर्धमान"},	{"Basirhat":"बसिरहाट"},	{"Bhadreswar":"भद्रेश्वर"},	{"Bhatpara":"भाटपाड़ा"},	{"Bidhannagar":"बिधाननगर"},	{"Binnaguri":"बिनागुरी"},	{"Bishnupur":"बिश्नुपुर"},	{"Bolpur":"बोलपुर"},	{"Kolkata":"कोलकाता"},	{"Chakdaha":"चकदाहा"},	{"Champdani":"चंपदानी"},	{"Chandannagar":"चंदननगर"},	{"Contai":"कॉन्टैई"},	{"Dabgram":"दग्राम"},	{"Darjiling":"दार्जिलिंग"},	{"Dhulian":"धुलियन"},	{"Dinhata":"दन्हाता"},	{"Dum Dum":"डम डम"},	{"Durgapur":"दुर्गापुर"},	{"Gangarampur":"गंगारामपुर"},	{"Garulia":"गरुलिया"},	{"Gayespur":"गायसपुर"},	{"Ghatal":"घाटल"},	{"Gopalpur":"गोपालपुर"},	{"Habra":"हाब्रा"},	{"Halisahar":"हल्सीहर"},	{"Haora":"हाउरा"},	{"HugliChunchura":"हुग्ली चंचुरा"},	{"Ingraj Bazar":"इंगraj बाजार"},	{"Islampur":"इस्लामपुर"},	{"Jalpaiguri":"जलपाईगुड़ी"},	{"Jamuria":"जमूरिया"},	{"Jangipur":"जंगीपुर"},	{"Jhargram":"झारग्राम"},	{"Kaliyaganj":"कालियागंज"},	{"Kalna":"कलना"},	{"Kalyani":"कल्याणी"},	{"Kamarhati":"कामभाटी"},	{"Kanchrapara":"कांचपारा"},	{"Kandi":"कंडी"},	{"Karsiyang":"कार्सियांग"},	{"Katwa":"कटवा"},	{"Kharagpur":"खड़गपुर"},	{"Kharagpur Railway Settlement":"खड़गपुर रेलवे सेटलमेंट"},	{"Khardaha":"खर्डहा"},	{"Kharia":"खरिया"},	{"Koch Bihar":"कोच बिहार"},	{"Konnagar":"कोनगर"},	{"Krishnanagar":"कृष्णनगर"},	{"Kulti":"कुल्टी"},	{"Madhyamgram":"मध्यमग्राम"},	{"Maheshtala":"महेश्टल"},	{"Memari":"मेमारी"},	{"Midnapur":"मिदनापुर"},	{"Naihati":"नैहाती"},	{"Navadwip":"नवद्वीप"},	{"Ni Barakpur":"नी बैरकपुर"},	{"North Barakpur":"उत्तर बैरकपुर"},	{"North Dum Dum":"उत्तर डम डम"},	{"Old Maldah":"ओल्ड मालदा"},	{"Panihati":"पनिहती"},	{"Phulia":"फुुलिया"},	{"Pujali":"पुजली"},	{"Puruliya":"पुरुलिया"},	{"Raiganj":"रायगंज"},	{"Rajpur":"राजपुर"},	{"Rampur Hat":"रामपुर टोट"},	{"Ranaghat":"रानाघाट"},	{"Raniganj":"रानीगंज"},	{"Rishra":"ऋष्रा"},	{"Shantipur":"शांतिपुर"},	{"Shiliguri":"सिलीगुड़ी"},	{"Shrirampur":"श्रीरामपुर"},	{"Siuri":"सिउरी"},	{"South Dum Dum":"दक्षिण डम डम"},	{"Titagarh":"टिटगढ़"},	{"Ulubaria":"उलुबेरिया"},	{"UttarparaKotrung":"उत्तरपाराकोट्रांग"},	{"Araria":"अररिया"},	{"Arrah":"अराह"},	{"Aurangabad":"औरंगाबाद"},	{"Bagaha":"बगहा"},	{"Begusarai":"बेगुसाराय"},	{"Bettiah":"बेटियाह"},	{"Bhabua":"भाबुआ"},	{"Bhagalpur":"भागलपुर"},	{"Bihar":"Bihar"},	{"Buxar":"बक्सर"},	{"Chhapra":"छपरा"},	{"Darbhanga":"दरभंगा"},	{"Dehri":"देहरी"},	{"DighaMainpura":"दीघा मैनपुरा"},	{"Dinapur":"दीनापुर"},	{"Dumraon":"Dumraon"},	{"Gaya":"गया"},	{"Gopalganj":"गोपालगंज"},	{"Goura":"गौरा"},	{"Hajipur":"हाजीपुर"},	{"Jahanabad":"जहानाबाद"},	{"Jamalpur":"जमालपुर"},	{"Jamui":"जामूई"},	{"Katihar":"कटिहार"},	{"Khagaria":"खगरिया"},	{"Khagaul":"खगौल"},	{"Kishanganj":"किशनगंज"},	{"Lakhisarai":"लखिसराई"},	{"Madhipura":"मधेपुरा"},	{"Madhubani":"मधुबनी"},	{"Masaurhi":"Masaurhi"},	{"Mokama":"मोकामा"},	{"Motihari":"मोतीहारी"},	{"Munger":"मुंगेर"},	{"Muzaffarpur":"मुजफ्फरपुर"},	{"Show Chaugadhia Muhurta":"चौधिया मुहूर्ता को दिखाएं"},	{"Show Hora Muhurta":"होरा मुहूर्ता दिखाएँ"},	{"Show Planetary Positions":"ग्रहों की स्थिति दिखाएं"},	{"Chaughadiya Name":"चोगडिया नाम"},	{"Time":"पहर"},	{"My Doshas":"मेरा दोष"},	{"My Yogas":"मेरे योग"},	{"Match Making":"मिलान बनाना"},	{"My planets":"मेरे ग्रह"},	{"General Nature":"सामान्य प्रकृति"},	{"New in Stores":"स्टोर में नया"},	{"Dresses":"कपड़े"},	{"Tops":"सबसे ऊपर है"},	{"Jackets":"जैकेट"},	{"Pants":"पैंट"},	{"Accessories":"सहायक उपकरण"},	{"Newsletter":"न्यूज़लैटर"},	{"Add To Wishlist":"इच्छा सूचि में डालें"},	{"View Post":"पोस्ट देखें"},	{"Leave a reply":"उत्तर छोड़ दें"},	{"Go Back To Blog":"ब्लॉग पर वापस जाएं"},	{"Name":"नाम"},	{"Email":"ईमेल"},	{"Contact no":"संपर्क नंबर"},	{"Comment":"टिप्पणी"},	{"I'm not a robot":"में रोबोट नहीं हूँ"},	{"Submit":"जमा करें"},	{"Login Please":"लॉग इन करें कृपया"},	{"Show Panchang":"पंचांग दिखाएँ"},	{"Exclusive Services":"विशेष सेवाएँ"},	{"Festivals Calender":"त्योहार कैलेंडर"},{"Profiles":"प्रोफाइल"},{"Invoices":"चालान"},{"Forecast":"चालान"},{"Your Preferred Language":"आपकी पसंदीदा भाषा"}];
//            var out = [];
//            alert(lang);
//            
//            return lang;
            if(lang=='en')
            {
                return val;
            }
            if(lang=='')
            {
                var lang=getCookie('language');
                if(lang!='')
                {
                    if(lang=='hi')
                    {
                        angular.forEach(hi, function(value, key)
                        {
                            angular.forEach(value, function(v1, key1)
                            {
                                if(key1.toString() == val)
                                {
                                    out=v1;
                                }
                            });                        
                        });
                    }
                    return out;
                }
                else
                {
                    return 'none';
                }
            }
            else
            {
                if(lang=='hi')
                {
                    angular.forEach(hi, function(value, key)
                    {
                        angular.forEach(value, function(v1, key1)
                        {
                            if(key1.toString() == val)
                            {
                                out=v1;
                            }
                        });                        
                    });
                }
            }
            return out;
        };
    });
    appIndex.controller('ctrlIndex',['$scope', '$http', '$log', '$filter','adminService','$window','$sce', function($scope, $http, $log, $filter,adminService,$window,$sce)
    {
        $scope.lang='hi';
        $scope.user = {};
        $scope.panchang=[];
        $scope.horo=[];
        $scope.userLogged='';
        $scope.city='';
        $scope.bd=[];
        $scope.bd.all=[];
        $scope.pageSize=9;
        $scope.currentPage = 0;
        $scope.pageSize = 9;
        $scope.feature_ques = [];
        $scope.qfil = 0;
        $scope.qfil1=0;
        $scope.pnPage=[]
        $scope.pview='';
        $scope.parentIndex=0;
        $scope.cur_item=[];
        $scope.actPage=0;
        $scope.astro_ex=[];
        $scope.vastu_ex=[];
        $scope.numero_ex=[];
        $scope.defNumEx=0;
        $scope.defVasEx=0;
        $scope.defServEx=0;
        $scope.dosha=[];
        $scope.fea_det=[];
        $scope.feaType='';
        $scope.vfeaViews='';
        $scope.tempuser=0;
        $scope.url='scripts/qfinder_main';
        $scope.modalWin='false';
        $scope.favsUser=[];
        $scope.proPic=[];
        $scope.uid=[];
        $scope.allCities=[];
        $scope.pujatotal=0;
        $scope.sel={};
        $scope.timeDure='';
        $scope.dtpick='';
        $scope.sel_city='Delhi,28.7041,77.1025';
        $scope.of_avail=false;
        $scope.on_avail=false;
        $scope.city_name='Delhi';
        $scope.selAdnItm=[];
        $scope.addon={};
        $scope.adn=0;
        $scope.bdConServ=0;
        $scope.dt1_sel='x';
        $scope.all=[];
        $scope.date_tc='';
        $scope.time_tc1='00';
        $scope.time_tc2='00';        
        $scope.matrep=[];
        $scope.hform11=[];           
        $scope.hform2=[];
        $scope.tags=[];
        $scope.del_loc=0;
        $scope.log=[];
        $scope.otptype='gen';
        $scope.AllItemsHdr=[];
        $scope.printed=0;
        $scope.templeData={};
        
        
        $scope.langu='Hindi';
        $scope.mainFunc=function(uid)
        {
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            
        }
        $scope.initAllF=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.uid=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.getBasehoro();
            $scope.getAllItems();    
            $scope.getWallet();
//            $scope.getgenhoro();
            
        };
        
        $scope.initAllFotp=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.otptype='check';
            $scope.modalWin=true;
            $scope.modalShown='signotp'; 
            $scope.getAllItems();   
            $scope.getWallet();         
        };
        $scope.initAllFbd=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.otptype='check';
            $scope.modalWin=true;
            $scope.modalShown='bd_update'; 
            $scope.getAllItems();     
            $scope.getWallet();             
        };
        $scope.initAllF2=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
            $scope.getDoshas();
            $scope.getFeatures('astro_qu',0);
            $scope.getgenhoro(); 
            $scope.getAllItems();
              
            $scope.getWallet();    
        };
        $scope.initAllF2x=function(uid,idx)
        {
//            alert(idx);
            $scope.url='../../scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
//            alert();
            $scope.getDoshas();
            $scope.getFeatures2('astro_qu',idx);
            $scope.getgenhoro();
            $scope.getAllItems();  
            $scope.getWallet();    
        };
        $scope.initAllVastu=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            $scope.getVastuData();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.getDoshas();
            $scope.getgenhoro();
            $scope.getAllItems();   
            $scope.getWallet();               
        }; 
        $scope.initAllVastu2=function(uid,idx)
        {
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
            $scope.getDoshas();
            $scope.getFeatures2('vastu_qu',idx);
            $scope.getgenhoro();
            $scope.getAllItems();   
            $scope.getWallet();                           
        };         
        $scope.initAllNumero=function(uid)
        {
            $scope.svl1=1;
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
//            $log.log('???????????????????????????');
            $scope.getNumeroData();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
//            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
//            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
            $scope.getDoshas();
//            $scope.getFeatures('numero_qu',0);
            $scope.getgenhoro();
            $scope.getAllItems();  
            $scope.getWallet();    
        };      
        $scope.initAllNumero2=function(uid,idx)
        {
            $scope.url='../../scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            $scope.getNumeroData();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
            $scope.getDoshas();
            $scope.getFeatures2('numero_qu',idx);
            $scope.getgenhoro(); 
            $scope.getAllItems();    
            $scope.getWallet();                         
        }; 
        $scope.initAllPanch=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.mainFunc(uid);
            $scope.chaugadhiya=[];
            $scope.planetary=[];
            $scope.hora=[];            
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
            $scope.getDoshas();
            $scope.getgenhoro(); 
            $scope.getAllItems();   
            $scope.getWallet();                          
//            $scope.getChaugadia('2');           
//            $scope.getHora('2');           
//            $scope.getPlanetary('2');
        }; 
        $scope.initAllAS=function(uid,fea_name,fea_id)
        {
            $scope.url='../../scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getFeaDet(fea_name,fea_id);
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.addFeaView(fea_id,uid);            
            $scope.getAllItems();      
            $scope.getWallet();            
//            $scope.getgenhoro();            
        };        
        $scope.initAllPujas=function(uid,fea_name,fea_id)
        {
            $scope.addrsel={};
            $scope.puja_type='basic';
            $scope.url='../../scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPujaDet(fea_name,fea_id);
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.addPujaView(fea_id,uid);
            $scope.getCities();
            $scope.getTags('puja_pack_tab',fea_id,'true');
            $scope.getAllItems();   
            $scope.getWallet();               
//            $scope.getgenhoro();            
        };    
        $scope.initCart=function(uid)
        {
            $scope.addrsel={};
            $scope.puja_type='basic';
            $scope.url='./scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
//            $scope.getCities();
            $scope.getCartUpdate();
            $scope.getAllItems();     
            $scope.getWallet(); 
            $scope.ad_deduct='no';
            
        };    
        $scope.pageVarInit=function()
        {
            $scope.getAllItems();   
            $scope.getWallet();               
//            $scope.vm = {};
//            $scope.vm.pager = {};
//            $scope.vm.setPage = $scope.setPage;
        }
        $scope.initAllFpuja=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.getPujas('2',0);
            $scope.getAllItems();     
            $scope.getWallet();             
//            $scope.addPujaView(fea_id,uid);
        }; 
        $scope.initAllFpuja2=function(uid,idx)
        {
            $scope.url='../../scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            
            $scope.getPujas2('2',idx);
            $scope.getAllItems();     
            $scope.getWallet();      
            $scope.getFeaturesAny('astro_exclusive','0','ex');
//            $scope.addPujaView(fea_id,uid);
        };         
        $scope.initSPB=function(uid)/* for blog and post page (general blog) */
        {            
            $scope.posts=[];
            $scope.url='../scripts/qfinder_main';
//            alert($scope.url);
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getBlogList('post');
            $scope.getAllItems();    
            $scope.getWallet();              
            //            $scope.getgenhoro();            
        };       
        $scope.initSPBv=function(uid)/* for blog and post page (general blog) */
        {           
//            alert();
            $scope.posts=[];
            $scope.url='../scripts/qfinder_main';
//            alert($scope.url);
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getBlogList('video');
            $scope.getAllItems();   
            $scope.getWallet();               
            //            $scope.getgenhoro();            
        };          
        $scope.initServUsage=function(uid)
        {
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
//            $scope.setPage(1, $scope.cItm);
            $scope.servs=[];
            $scope.ySet=1950;
            $scope.servs.pending=[];
            $scope.servs.requested=[];
            $scope.servs.expired=[];
            $scope.servs.used=[];   
            $scope.pujaele=[];
            $scope.serv_type='Pending Services';
            $scope.url='scripts/qfinder_main';
            $scope.mainFunc(uid);
            $scope.getPurServ('all');
            $scope.getPurPuja('all');
            $scope.getAllItems();     
            $scope.getWallet();             
        };       
        $scope.initReports=function(uid)
        {
            $scope.mainFunc(uid);
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $scope.url='scripts/qfinder_main';
            $scope.reports=[];
            $scope.getReportsCom();
            $scope.show_load_more=false;
            $scope.getAllItems();    
            $scope.getWallet();              
        };          
        $scope.initLogU=function(uid)
        {            
            $scope.showxitem=0;
            if(uid=='gen')
            {
                $scope.bd=$scope.getBd();
                $scope.modalWin=true;
                $scope.modalShown='login';                
            }
            else
            {
                $scope.bd=$scope.getBd();
                $scope.getAllBd(uid);                
            }
            $scope.user=uid;              
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }            
            $scope.getAllItems();    
            $scope.getWallet();              
        };  
        $scope.initOverv=function(uid)
        {            
            if(uid=='gen')
            {
                $scope.bd=$scope.getBd();
                $scope.modalWin=true;
                $scope.modalShown='login';                
            }
            else
            {
                $scope.bd=$scope.getBd();
                $scope.getAllBd(uid);                
            }
            $scope.user=uid;              
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }    
            $scope.getAllItems();      
            $scope.getWallet();                    
        };    
        $scope.initOverv2=function(uid,phr)
        {
            $scope.url='../scripts/qfinder_main';
            if(uid=='gen')
            {
                $scope.bd=$scope.getBd();
                $scope.modalWin=true;
                $scope.modalShown='login';                
            }
            else
            {
                $scope.bd=$scope.getBd();
                $scope.getAllBd(uid);                
            }
            $scope.user=uid;              
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }   
            $scope.getOverPHR(phr);
            $scope.getAllItems();     
            $scope.getWallet();             
        };  
        $scope.initInvoices=function(uid)
        {
            $scope.url='scripts/qfinder_main';
            $scope.mainFunc(uid);
            $scope.inv_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $scope.invoices=[];
            $scope.getInvCom('',0);
            $scope.getAllItems();     
            $scope.getWallet();             
        }; 
        $scope.initInvo=function(uid,ses)
        {
            $scope.url='../scripts/qfinder_main';
            $scope.mainFunc(uid);
            $scope.inv_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $log.log('itmsx');
            $scope.getUserDet(uid);
            $log.log('itmsx');
            $scope.invoices=[];
            $scope.getInvCom('',ses);
            $scope.getAllItems();     
            $scope.getWallet();             
        }; 
        $scope.getUserDet=function(uid)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_user_det',"uid":uid},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $log.log('itmsx');
                $log.log(data);
                $scope.udet= data[0];                
            });
        }
        $scope.createBD=function()
        {
            $scope.params={"con":'addBD',"det":$scope.bdup};
            $log.log($scope.params);
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : $scope.params,
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $log.log(data);
                if(data==1)
                {
//                    window.location.href='index';
                }
            });
        };
        $scope.getBd=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_ses_bd',"uid":$scope.user},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $scope.bd=data;
                if($scope.user!='gen')
                {
                    $scope.proPic=getCookie('pro_pic');
                    $scope.user_name=$scope.bd.user_name;  
//                    $scope.getCartUpdate();
                    $scope.getNotifi();
                    
                }          
//                $log.log(data);
                $scope.getgenhoro();
                $scope.getDoshas();
//                $log.log('error');
                $scope.favs();
                $scope.getUAddress($scope.user);
            });
        };
        $scope.up_bd_ses=function(id)
        {
            $scope.params={"con":'up_bd_ses',"uid":$scope.user,"bd_id":id};
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : $scope.params,
                
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data1) 
            {
                $scope.bd=data1; 
                $scope.user_name=data1.user_name; 
                $scope.getgenhoro();                
            });            
        }
        $scope.changeShow=function(ind)
        {
            $scope.svl1=ind;
        }
        $scope.getAllItems=function()
        {
            $scope.params = 
            {
                "con"   :   "getAllHdrItms"
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
            {  
                    $scope.AllItemsHdr=data;   
                    $log.log('---------------------');
                    $log.log(data);
                    $log.log('---------------------');
            });
        };
        
        $scope.langu.onChange = function(cbState) {
                alert(cbState);
          };
        var timer;
        var updateCounter = function() {
            $scope.counter--;
            if($scope.counter<=0)
            {
                $scope.conServChange('noanswer');
            }
            else
            {
                timer = $timeout(updateCounter, 1000);
            }
        };
        $scope.getNotifi=function()
        {            
            $scope.params = 
            {
                "con"   :   "get_notifi_user"
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {  
                    if(data.length>=1)
                    {                            
                        $scope.noties=data;
                    }
            });
        };
        $scope.getInvCom=function(typex,idx)
        {            
            $scope.params = 
            {
                "con"   :   "get_inv_user",
                "type"  :   typex,
                "id"    :   idx
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {  
                    $log.log(data);
                    $log.log('inv');
                    $scope.invoices=data;    
                    $log.log($scope.invoices.items);
            });
        };
        $scope.addItems=function(itm1,itm2)
        {
//            $log.log(itm1);
//            $log.log(itm2);
            return (parseInt(itm1)+parseInt(itm2));
        }
        $scope.getDisc=function(var1,var2)
        {
            return (parseFloat(var1)-parseFloat(var2));
        }
        $scope.getTotInv1=function(var1,var2,var3)
        {
            return (parseFloat(var1)-parseFloat(var2)-parseFloat(var3));
        };
        $scope.initMatch=function(uid)
        {            
            $scope.matrep.res=[];
            $scope.matrep.ret='false';
            $scope.hform11.latitude = '';
            $scope.hform11.longitude = '';
            $scope.hform11.date = 1;
            $scope.hform11.month = 1;
            $scope.hform11.year = 2017;
            $scope.hform11.hour = 12;
            $scope.hform11.minu= 12;
            $scope.hform2.latitude = '';
            $scope.hform2.longitude = '';
            $scope.hform2.date = 1;
            $scope.hform2.month = 1;
            $scope.hform2.year = 2017;
            $scope.hform2.hour = 12;
            $scope.hform2.minu= 12;
            $scope.url='scripts/qfinder_main';
            $scope.user=uid;  
            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
            $scope.getCities();
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getPanchang('today');
            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.vastu_ex=$scope.getFeaturesAny('vastu_exclusive','0','ex');
            $scope.numero_ex=$scope.getFeaturesAny('numero_exclusive','0','ex');
            $scope.getgenhoro();            
        };
        $scope.getMatchPoints=function()
        {
            $scope.hform11.latitude = document.getElementById('h11latitude').value;
            $scope.hform11.longitude = document.getElementById('h11longitude').value;
            $scope.hform11.date = document.getElementById('h1date').value;
            $scope.hform11.month = document.getElementById('h1month').value;
            $scope.hform11.year = document.getElementById('h1year').value;
            $scope.hform2.latitude = document.getElementById('h2latitude').value;
            $scope.hform2.longitude = document.getElementById('h2latitude').value;
            $scope.hform2.date = document.getElementById('h2date').value;
            $scope.hform2.month = document.getElementById('h2month').value;
            $scope.hform2.year = document.getElementById('h2year').value;
            $scope.hform2.time_zone = 5.5;
            $scope.hform11.time_zone = 5.5;
            $scope.params = 
            {
                "con"       :   "match_making_report",
                "lat1"  : $scope.hform11.latitude,
                "long1"  : $scope.hform11.longitude,
                "d1"  : $scope.hform11.date,
                "m1"  : $scope.hform11.month,
                "y1"  : $scope.hform11.year,
                "lat2"  : $scope.hform2.latitude,
                "long2"  : $scope.hform2.longitude,
                "d2"  : $scope.hform2.date,
                "m2"  : $scope.hform2.month,
                "y2"  : $scope.hform2.year,
                "t1"  : $scope.hform2.time_zone,
                "t2"  : $scope.hform11.time_zone,
                "h1"  : $scope.hform2.hour,
                "h2"  : $scope.hform11.hour,
                "mi1"  : $scope.hform2.minu,
                "mi2"  : $scope.hform11.minu
            }
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) { 
//                    data=json
//                    $log.log(data.length);
                    $log.log(data.ashtakoota);
                    if(angular.isDefined(data.ashtakoota))
                    {
                        alert('x');
                        $scope.matrep.ret=true;
                        $scope.matrep.rec=data;
                    }
                    else
                    {
                        alert('y');
                        $scope.matrep.ret=false;
                        $scope.matrep.rec=[];
                    }
//                    $scope.reports=data.items;
//                    if(data.items.length<data.count.length)
//                    {
//                        $scope.show_load_more=true;
//                    }
//                    else
//                    {
//                        $scope.show_load_more=false;
//                    }
            });
        };
        $scope.pdfApiCall=function()
        {
            $scope.params = 
            {
                "con"       :   "pdfApiCall"
            }
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
//                    $log.log(data);
                    if(data.status==true)
                    {
                        $window.open(data.pdf_url);
                    }
                    else
                    {
                        
                    }
                });
        };
        $scope.userRequestVendor=function()
        {
            $scope.params = 
            {
                "con"       :   "user_request_vendor",
                "get_by"    :   'puja_type',
                "id"        :   'online',
                "type"      :   ''
            }
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
                {
                    $log.log('td--------------');
                    $log.log(data);
                    $log.log('td--------------');
                });
        };
        $scope.getArrFNo = function(valx)
        {
            return new Array(valx);            
        };
        $scope.getReportsCom=function(valx,idx)
        {
            alert();
            $scope.params = 
            {
                "con"   :   "get_reports_com",
                "type"  :   valx,
                "id"    :   idx
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {  
                    $log.log(data);
                     $log.log('>>>>');
                    $scope.reports=data.items;
                    if(data.items.length<data.count.length)
                    {
                        $scope.show_load_more=true;
                    }
                    else
                    {
                        $scope.show_load_more=false;
                    }
            })
                    .error(function(data){$log.log('error');});
        };
        $scope.checkDoshas=function()
        {
//            $http({
//                method  : 'POST',
//                url     : $scope.url,
//                data    : {"con":'get_doshas',"uid":$scope.user},
//                headers : {'Content-Type':'application/x-www-form-urlencoded'}
//            })
//            .success(function(data) 
//            {
//                $log.log('Here>>>>>>>');
//                $log.log(data);
//                $scope.doshas=data;
//            });
        };
        $scope.initAllFest=function(uid)
        {
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $scope.fest=[];
            $scope.ySet=1950;
            $scope.url='scripts/qfinder_main';
            $scope.itm_fest=0;
            $scope.mainFunc(uid);
            $scope.getFestAll('','');
        };
        $scope.initAllSubs=function(uid)
        {
            $scope.subsall=[];
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $scope.fest=[];
            $scope.ySet=1950;
            $scope.url='scripts/qfinder_main';
            $scope.itm_fest=0;
            $scope.mainFunc(uid);
            $scope.getSubsAll(0);
            $scope.getFeaAll(0);
        };
        $scope.getSubsAll=function(id)
        {
            $scope.formData = {
                "con"   :   'get_all_packs',
                'id'    :   id
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $scope.subsall=data;
                $log.log('subsall');
                $log.log(data);
            });
        };
        $scope.getInfo=function()
        {
            $http.get("php/check_default_bd").success(function(data){
                $scope.p_stat=data;
                if($scope.p_stat==0)
                { 
                    $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'act_user'},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                   })
                    .success(function(data) {
                        $scope.ap=data;
                    });
                    $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'def_pro'},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                   })
                    .success(function(data) {
                        $scope.dp=data;
                    });
                    $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'all_profiles',"type":'user'},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                   })
                    .success(function(data) {
                        $scope.user_pro=data;
//                        $log.log($scope.user_pro);
                    });
                }
                $scope.showLoader=0;
            });
        };
        $scope.getFestAll=function(type,month)
        {            
            var year='';
            $scope.fest_dta=[];
            $scope.formData = {
                "con"     :   'get_fest',
                'type'    :   type,
                'month'   :   month,
                'year'    :   year,
                'fest_id'    :   0
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log("fest data : ");
//                $log.log(data);
                $scope.fest_dta=data;
                angular.forEach(data, function(value, key)
                {
                    if(value.length>0)
                    {
                        document.getElementById(key).className='mgf';
//                        angular.forEach(value, function(value2, key2)
//                        {
//                            document.getElementById(key).innerHTML='aa';
//                        });
                    }
                });
            });
        };
        $scope.getPanchang=function(dt)
        {
//            alert($scope.url);
//            alert($scope.city);
            $http({
            method  : 'POST',
            url     : $scope.url,
            data    : {"con":'get_panchang',"day":dt,"city":$scope.city},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
//                $log.log(data);
                $scope.panchang=data;
            });
        };
        $scope.getChaugadia=function(val)
        {
            $scope.getSelCity(val);
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",")
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            var dt=document.getElementById('dt_pan').value;
            $http({
            method  : 'POST',
            url     : $scope.url,
            data    : {"con":'get_chau',"day":dt,"city":$scope.city},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $log.log(data);
                $scope.chaugadhiya=data.chaughadiya;
                $log.log($scope.chaugadhiya);
            });
        };
        $scope.getPlanetary=function(val)
        {
            $scope.getSelCity(val);
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",")
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            var dt=document.getElementById('dt_pan').value;
            $http({
            method  : 'POST',
            url     : $scope.url,
            data    : {"con":'get_planet_con',"day":dt,"city":$scope.city},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $log.log(data);
                $scope.planetary=data;                
            });
        };
        
        $scope.getNumeroData = function()
        {
//            alert();
            $scope.formData = {
                "con"       :   'get_numero_data'
                
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log(data);
//                $log.log('>>>>>>>>>>>>>>>>>numero data');
                $scope.numero_dta=data;
            });
        };  
        $scope.getVastuData = function()
        {
            $scope.vas=[];
//            alert();
            $scope.formData = {
                "con"       :   'get_vastu_data'
                
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log(data);
//                $log.log('>>>>>>>>>>>>>>>>>numero data');
                $scope.vas_dta=data;
            });
        };  
        $scope.getHora=function(val)
        {
            $scope.getSelCity(val);
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",")
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            if(document.getElementById('dt_pan'))
            {
                var dt=document.getElementById('dt_pan').value;
            }
            else
            {
                var dt='today';
            }
//            alert(dt);
            $http({
            method  : 'POST',
            url     : $scope.url,
            data    : {"con":'get_hora',"day":dt,"city":$scope.city},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {                
                $scope.hora=data.hora;   
                $log.log($scope.hora);
            });
        };
//        function degCalc($val){
//        $deg = floor($val);
//        $min = floor(($val - $deg) * 60);
//        $sec = round(($val - $deg - $min/60)*3600);
//        $dms = "<h2>".$deg."&deg ".$min.'" '.$sec."'</h2>";
//        return $dms;
//    }
        $scope.calcDeg2Min=function(val)
        {
            var deg = Math.floor(val);
            var min = Math.floor((val - deg) * 60);
            var sec = Math.round((val - deg - min/60)*3600);
            var dms = deg+':'+min+':'+sec;
            return dms;
        }
        $scope.getPanPage=function(val)
        {
//            alert(document.getElementById('dt_pan').value)
            $scope.getSelCity(val);
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",")
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            $scope.getPanchang(document.getElementById('dt_pan').value);
            $scope.chaugadhiya=[];
            $scope.hora=[];
            $scope.planetary=[];
        }
        $scope.getSelCity=function(sel_city)
        {
            $scope.sel_city=$("#sel_city"+sel_city+" option:selected").val();
        }
        $scope.setCity=function(val)
        {
            $scope.getSelCity(val);
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",")
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            $scope.getPanchang('today');
        }     
        
        $scope.cxSelCt=function(val)
        {
            $scope.sel_city=val;
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",")
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";expires=-3600;";
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";expires=-3600;"
            ;document.cookie = "city_name=" + arrs[0] + ";";
            $scope.getPanchang('today');
//            alert();
        }     
        $scope.submitForm = function()
        {
            $http({
                method  :   'POST',
                url     :   'php/login',
                data    :   $scope.user,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $log.log(data);
                $scope.showLoader=0;
                if(data.item_id == -1){
                    $scope.user.wrcred = "Incorrect Username/Password";
                    $scope.user.userid = "";
                    $scope.user.pass = "";
                }
                else{
                    window.location.href="dashboard";
                }
                
            });
            /*alert('Login submitted ' + $scope.user.userid);*/
        };        
        $scope.getgenhoro=function()
        {
//            alert($scope.bd_id);
//            if(angular.isDefined($scope.bd.bd_id))
//            {
//                
//            }
//            else
//            {
//                $scope.bd_id='gen';
//            }
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_spe_hor',"uid":$scope.user},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $scope.horo=data;
                $log.log('error'+$scope.bd.bd_id);
                $log.log('Horoscope Data :');
                $log.log(data);
            });
        };        
        $scope.getBasehoro=function()
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_spe_hor',"uid":'gen'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $scope.genhoro=data;
            });
        }; 
        $scope.getFeatures=function(type,parent)
        {
            if(document.getElementById('ser_load'))
            {
                document.getElementById('ser_load').innerHTML='Loading';
            }
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_feaList',"type":type,"parent":parent,"ret_type":'with_child'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {   
                if(document.getElementById('ser_load'))
                {
                    document.getElementById('ser_load').innerHTML='No Service Found';
                }
//                $log.log(data);$log.log('test here');
                if(parent==0)
                {
                    $scope.feature_ques=data;
                    $scope.setActiveTab2(0);
                }
                else
                {
                    return $scope.data;
                }
            });            
        };   
        $scope.getPurPuja=function(val)
        {
            if(val=='all')
            {
                $scope.getPurPuja('pending');
                $scope.getPurPuja('accepted');
                $scope.getPurPuja('completed');
                $scope.getPurPuja('all_completed');
            }
            else
            {
                $scope.formData = {
                    "con"       :   'get_pur_puja_wt',
                    "val"       :   0,
                    "type"      :   val
                };
            }
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $log.log(data);
//                $log.log('xxxxxxxxxxxxxxxxx');
                if(val=='pending')
                {
                    $scope.cItm=data;
                    $scope.pujaele.pending=data;
                }
                if(val=='approved')
                {
                    $scope.cItm=data;
                    $scope.pujaele.approved=data;
                }
                if(val=='completed')
                {
                    $scope.cItm=data;
                    $scope.pujaele.completed=data;
                }
                if(val=='all_completed')
                {
                    $scope.cItm=data;
//                    $log.log('expired');
                    $scope.pujaele.all_completed=data;
                }
            });
        }
        $scope.getFeatures2=function(type,parent)
        {
            if(document.getElementById('ser_load'))
            {
                document.getElementById('ser_load').innerHTML='Loading';
            }
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_feaList',"type":type,"parent":0,"ret_type":0},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                
                $scope.feature_ques=data;
                var i=0;
                var j=0;
                angular.forEach($scope.feature_ques, function(val,key)
                {
                   if(val['fea_id']==parent)
                   {
                       j=i;
                       $http({
                        method  : 'POST',
                            url     : $scope.url,
                            data    : {"con":'get_feaList',"type":type,"parent":parent,"ret_type":0},
                            headers : {'Content-Type':'application/x-www-form-urlencoded'}
                        })
                        .success(function(data1) 
                        {
                            if(document.getElementById('ser_load'))
                            {
                                document.getElementById('ser_load').innerHTML='No Service Found';
                            }
                            $log.log(data1);$log.log('test here');
                            $scope.feature_ques[j]['sub_fea']=data1;
                        });
                   }
                   i=i+1;
                });
                $scope.setActiveTab2(j);
                
            });            
        }; 
        $scope.getPujas=function(type,parent)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_PujaList',"parent":parent,"ret_type":type},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $log.log('error!!!');
                $scope.feature_ques=data;
                $log.log(data);
                $log.log('error!!!');
                $scope.setActiveTab3(0);
                
            });            
        };  
        $scope.getPujas2=function(type,parent)
        {
//            alert(parent);
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_PujaList',"parent":'0',"ret_type":'0'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                var ix=0;
                var j=0;
                $scope.feature_ques=data;
                angular.forEach(data, function(val,key)
                {
//                    alert(i);
                    if(val['pc_id']==parent)
                    {                        
                        j=ix;
//                        alert(j+'found'+parent);
                        $http({
                            method  : 'POST',
                            url     : $scope.url,
                            data    : {"con":'get_PujaList',"parent":parent,"ret_type":'2'},
                            headers : {'Content-Type':'application/x-www-form-urlencoded'}
                        })
                        .success(function(data1) 
                        {
                            $scope.feature_ques[j].pujas=data1[0].pujas;
                            $scope.setActiveTab3(j);
                        });
                    }
                    ix=ix+1;
                });
//                $scope.setActiveTab3(j);
//$log.log('---------');
//$log.log($scope.feature_ques);
//$log.log('---------');
            });            
        };             
        $scope.getData = function () {
          // needed for the pagination calc
          // https://docs.angularjs.org/api/ng/filter/filter
          return $filter('filter')($scope.feature_ques, $scope.qfil)
        };
        $scope.numberOfPages=function(){
            return Math.ceil($scope.getData().length/$scope.pageSize);                
        };        
        $scope.setActiveTab=function(counter)
        {
//            alert(counter);
            $scope.parentIndex=counter;
            $scope.qfil1=counter;
            $scope.pview=counter+'-'+0;
            $scope.actPage=0;
            $scope.pnPage=[];
        };
        /*****************
         * 
         * 2nd solution of product showing with pagination
         * 
         * 
         * 
         *********************/
        $scope.setActiveTab2=function(counter)
        {
            $scope.qfil1=counter;
            $scope.cur_item[0]=$scope.feature_ques[counter];
            $scope.pview=$scope.cur_item[0].fea_id+'-'+0;
            $scope.actPage=0;
            $scope.pnPage=[];
        };
        $scope.setActiveTab21=function(counter)
        {
            $scope.qfil1=counter;
            $scope.cur_item[0]=$scope.feature_ques[counter];
            $scope.pview=$scope.cur_item[counter].fea_id+'-'+0;
            $scope.actPage=0;
            $scope.pnPage=[];
        };
        /** set activation of puja categories **/
        $scope.setActiveTab3=function(counter)
        {
            $scope.qfil1=counter;
            $scope.cur_item[0]=$scope.feature_ques[counter];
            $scope.pview=$scope.cur_item[0].pc_id+'-'+0;
            $scope.actPage=0;
            $scope.pnPage=[];
        };
        $scope.setPageNo2=function(par,chi)
        {
            $scope.pn=Math.ceil(chi/$scope.pageSize);
            $scope.pnPage[par]=$scope.pn;
        }   
        /*****************
         * 
         * 2nd solution of product showing with pagination
         * 
         * 
         * END
         *********************/
        /* sol 3 */
        
        $scope.paginateSc={};
        
        
        $scope.setPageNo3x=function(par,chi)
        {
            
            $scope.pn=Math.ceil(chi/$scope.pageSize);
            $scope.pnPage[par]=$scope.pn;
        }
        
        $scope.setPn3x=function(par)
        {
            $scope.pview=0;
            $scope.paginateSc.itemcount=0;
            $scope.paginateSc.itemcount2=0;
            angular.forEach($scope.cur_item[par].sub_fea, function(value, key)
            {
                if(value['fea_type']=='base')
                {
                    $scope.paginateSc.itemcount=$scope.paginateSc.itemcount+1;
                }
            });
//            alert(par);
//            alert($scope.cur_item[par]);
            $log.log($scope.cur_item[par]);$log.log('$scope.cur_item[par]');
//            $scope.pnPage[par]=[];
        }        
        $scope.get_pn3x=function(indexpn)
        {
            if($scope.cur_item['sub_fea'][indexpn].fea_type=='base')
            {
                if($scope.paginateSc.itemcount2<=$scope.paginateSc.itemcount)
                {
                    $scope.paginateSc.itemcount2=$scope.paginateSc.itemcount2+1;
                    return Math.floor($scope.paginateSc.itemcount2/$scope.pageSize);
                }
                else
                {
                    return 'x';
                }
//                  alert(Math.floor(indexpn/$scope.pageSize));                    
            }
            else
            {
                return 'x1';
            }
        }
        $scope.getNumber3x = function(par)
        {
            return Math.ceil(par/$scope.pageSize)
        };
        
        /* sol 3 */
        
        
        
        $scope.servPage=[];        
        $scope.setPageNo=function(par,chi)
        {
            $scope.pn=Math.ceil(chi/$scope.pageSize);
            $scope.pnPage[par]=$scope.pn;
        }
        $scope.setPn=function(par)
        {
            $scope.pnPage[par]=[];
        }        
        $scope.get_pn=function(indexpn)
        {
            return Math.floor(indexpn/$scope.pageSize)
        }
        $scope.getNumber = function(par)
        {
            return new Array($scope.pnPage[par]);   
        };        
        $scope.changePVTab=function(par,chi)
        {
            $scope.pview=par+'-'+chi;            
            $scope.actPage=chi;
            $log.log($scope.cur_item[0].sub_fea);
            for(var i=0;i<$scope.cur_item[0].sub_fea.length;i++)
            {
                var ids='btnPG'+i;
//                alert(ids);
//                document.getElementById(ids).className='btn btn-default';
            }
            document.getElementById('btnPG'+chi).className='btn btn-primary';
            $log.log($scope.actPage);
        };        
        $scope.getFeaturesAny=function(type,parent,ex)
        {
//            alert('called');
            $scope.parmas={"con":'get_feaListAll',"type":type,"parent":parent,"ret_type":'with_child',"ex":ex};
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : $scope.parmas,
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                if(type=='astro_exclusive')
                {
                    $scope.astro_ex=data;
//                    $log.log('This is exclu');
//                    $log.log($scope.astro_ex);
                }
                if(type=='vastu_exclusive')
                {
                    $scope.vastu_ex=data;
                }
                if(type=='numero_exclusive')
                {
                    $scope.numero_ex=data;
                }
            });            
        };        
        $scope.setServex=function(index)
        {
            $scope.defServEx=index;
        };
        $scope.setNumex=function(index)
        {
            $scope.defNumEx=index;
        };
        $scope.setVasex=function(index)
        {
            $scope.defVasEx=index;
        };        
        $scope.getDoshas=function() /* get doshas / dashas / yoga related informations */
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_doshas'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $scope.dosha=data;
                $log.log(data);
                    $log.log('This is doshas');
                if(data.error=='false')
                {
                    $scope.dosha=data.item.dosha;
                    $log.log($scope.dosha);
                    $log.log(data);
                    $log.log('This is doshas');
                }
                else
                {
//                    $log.log('<<<<<<<<<<<<<<here>>>>>>>>>>>>>>>');
//                    $log.log(data);
                }
            });
        };
        $scope.showapiuser = function(value) /* gets all api data from db / api */
        {
            $scope.x1=[]
            $scope.params={"con":value};
            $http({
            method  : 'POST',
            url     : 'scripts/qfinder.php',
            data    : $scope.params,
             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) 
            {
//                    $scope.mainApidata[value].val=1;
                $scope.tempid='mn'+value;
                document.getElementById('mn'+value).style.display='block';
                document.getElementById('ac'+value).innerHTML=data;
//                    document.getElementById($scope.tempid).className='box-primary';
                document.getElementById($scope.tempid).focus();
            });
        };
        $scope.getPujaDet=function(puja_name,puja_id)
        {
            if(isNaN(puja_id))
            {
                $scope.feaType='exp';
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'puja_det',"uid":$scope.user,"puja_name":puja_name,"puja_id":puja_id},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .success(function(data) 
                {
                    if(puja_name==$scope.getHyphenated(data.item.puja_name))
                    {
//                        alert($scope.getHyphenated(data.item.fea_name));
                        $scope.fea_det=data;
                        if(angular.isDefined(fea_det[0].puja_pack[0].or[0]))
                        {
                            $scope.orpuja=fea_det[0].puja_pack[0].or[0];
                        }
                        $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
                        $scope.pujatotal=$scope.fea_det[0].puja_pack[0].package_price;
                        angular.forEach($scope.fea_det[0].puja_pack[0].addons, function(value, key)
                        {
                            $scope.sel[value.item_name]='';
                        });
                    }
                });
            }
            else
            {
                $scope.feaType='gen';
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'puja_det',"uid":$scope.user,"puja_name":puja_name,"puja_id":puja_id},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .success(function(data) 
                {
                    $log.log(data);
                    if(puja_name==$scope.getHyphenated(data[0].puja_name))
                    {
//                        alert($scope.getHyphenated(data.item.fea_name));
                        $scope.fea_det=data;
                        $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
                        $scope.pujatotal=$scope.fea_det[0].puja_pack[0].package_price;
                        angular.forEach($scope.fea_det[0].puja_pack[0].addons, function(value, key)
                        {
                            $scope.sel[value.item_name]='';
                        });
                    }
                });
            }
            
        }
        $scope.getFeaDet=function(fea_name,fea_id)
        {
            if(isNaN(fea_id))
            {
                $scope.feaType='exp';
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'fea_det_exp',"uid":$scope.user,"fea_name":fea_name,"fea_id":fea_id},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .success(function(data) 
                {
                   
                    if(fea_name==$scope.getHyphenated(data.item.fea_name))
                    {
//                        alert($scope.getHyphenated(data.item.fea_name));
                        $scope.fea_det=data.item;
                    }
                });
            }
            else
            {
                $scope.feaType='gen';
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'fea_det_gen',"uid":$scope.user,"fea_name":fea_name,"fea_id":fea_id},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .success(function(data) 
                {
                    if(fea_name==$scope.getHyphenated(data.item[0].fea_name))
                    {
//                        alert($scope.getHyphenated(data.item.fea_name));
                        $scope.fea_det=data.item;
                    }
                });
            }
            
        }
        $scope.getHyphenated=function(fea_name)
        {
            var mystring = fea_name;
            mystring=mystring.replace(/ /g , "-");
//            $log.log(mystring);
            return mystring;
        };
        $scope.addFeaView=function(fea_id,uid)
        {
            if(uid=='gen')
            {
                $scope.vfeaViews=getCookie('feaViews');
                if($scope.vfeaViews=='')
                {
                    var d = new Date();
                    d.setDate(d.getDate()+0.09);
                    document.cookie = "feaViews=" + fea_id + ";expires="+d+";";     
                    $http({
                        method  : 'POST',
                        url     : $scope.url,
                        data    : {"con":'add_fea_view',"uid":$scope.user,"fea_id":fea_id},
                        headers : {'Content-Type':'application/x-www-form-urlencoded'}
                    })
                    .success(function(data) 
                    {
                        
                    });
                }
                else
                {
                    var xstr=$scope.vfeaViews;
                    xstr=xstr.split(',');
                    if(xstr.indexOf(fea_id)==-1)
                    {
                        var d = new Date();
                        d.setDate(d.getDate()+0.09);
                        document.cookie = "feaViews=" + $scope.vfeaViews+','+fea_id + ";expires="+d+";";
                        $http({
                            method  : 'POST',
                            url     : $scope.url,
                            data    : {"con":'add_fea_view',"uid":$scope.user,"fea_id":fea_id},
                            headers : {'Content-Type':'application/x-www-form-urlencoded'}
                        })
                        .success(function(data) 
                        {
                            
                        });                        
                    }
                }
            }
            else
            {
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'add_fea_view',"uid":$scope.user,"fea_id":fea_id},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .success(function(data) 
                {
//                    
                });
                
            }
            $scope.getFeaView(fea_id);
        };
        $scope.addPujaView=function(puja_id,uid)
        {
            if(uid=='gen')
            {
                $scope.vfeaViews=getCookie('pujaViews');
                if($scope.vfeaViews=='')
                {
                    var d = new Date();
                    d.setDate(d.getDate()+0.09);
                    document.cookie = "pujaViews=" + puja_id + ";expires="+d+";";     
                    $http({
                        method  : 'POST',
                        url     : $scope.url,
                        data    : {"con":'add_puja_view',"uid":$scope.user,"puja_id":puja_id},
                        headers : {'Content-Type':'application/x-www-form-urlencoded'}
                    })
                    .success(function(data) 
                    {
                        
                    });
                }
                else
                {
                    var xstr=$scope.vfeaViews;
                    xstr=xstr.split(',');
                    if(xstr.indexOf(puja_id)==-1)
                    {
                        var d = new Date();
                        d.setDate(d.getDate()+0.09);
                        document.cookie = "pujaViews=" + $scope.vfeaViews+','+puja_id + ";expires="+d+";";
                        $http({
                            method  : 'POST',
                            url     : $scope.url,
                            data    : {"con":'add_puja_view',"uid":$scope.user,"puja_id":puja_id},
                            headers : {'Content-Type':'application/x-www-form-urlencoded'}
                        })
                        .success(function(data) 
                        {
                            
                        });                        
                    }
                }
            }
            else
            {
                $scope.params={"con":'add_puja_view',"uid":$scope.user,"puja_id":puja_id};
                $log.log($scope.params);
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : $scope.params,
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .success(function(data)                 
                {
                });
                
            }
            $scope.getPujaView(puja_id);
        };
        $scope.getFeaView=function(fea_id)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_fea_view',"fea_id":fea_id},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $scope.viewx=data.counter;
            });
        };
        $scope.getPujaView=function(puja_id)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_puja_views',"puja_id":puja_id},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
                $log.log(data);
                $log.log('data');
                $scope.viewx=data.counter;
            });
        };
        $scope.call_modal=function()
        {
            callModal();
        };
        /*Registration RELATED*/
        $scope.setRef=function(data1,data2)
        {
            $scope.refno=data1;
            $scope.src=data2;
            $scope.user_name='';
            $scope.user_em='';
            $scope.user_eml='';
            $scope.user_con='';
            $scope.user_pass='';
            $scope.user_passl='';
            $scope.user_pass2='';
        };
        $scope.checkAll=function()
        {
            $scope.errorx.un=false;
            $scope.errorx.up=false;
            $scope.errorx.up2=false;
            $scope.errorx.em=false;
            $scope.errorx.con=false;
            $scope.valid=0;
            if($scope.user_pass!='' && $scope.user_pass!=null)
            {
                if($scope.user_pass!=$scope.user_pass2)
                {
                    $scope.message.type='error';
                    $scope.message.error='Passwords did not matched';
                    $scope.valid=$scope.valid+1;
                }
            }
            else
            {
                if($scope.user_pass2==null)
                {
                    $scope.errorx.up2=true;
                    $scope.valid=$scope.valid+1;
                }
            }
            if($scope.user_em!='' && $scope.user_em!=null)
            {
                $scope.checkEM($scope.user_em);
                if($scope.cem=='on')
                {
                    $scope.message.type='error';
                    $scope.message.error='Already Registared With Email /Contact Number.';
                }
            }
            else
            {
                $scope.valid=$scope.valid+1;
                $scope.errorx.em=true;
            }
            if($scope.user_name=='' || $scope.user_name==null)
            {
                $scope.errorx.un=true;
                $scope.valid=$scope.valid+1;
            }
            if($scope.user_con=='' || $scope.user_con==null)
            {
                $scope.errorx.con=true;
                $scope.valid=$scope.valid+1;
            }
            if($scope.valid==0)
            {
                $scope.subForm();
            }
            $log.log($scope.user_name);
            $log.log($scope.user_em);
            $log.log($scope.user_con);
            $log.log($scope.user_pass);
            $log.log($scope.user_pass2);
        };
        $scope.subForm=function()
        {
            //alert('here1');
            $scope.formData = {
                "con"       :   'reg',
                "user_em"   :   $scope.user_em,
                "user_pass" :   $scope.user_pass,
                "user_con"  :   $scope.user_con,
                "ref_no"    :   $scope.ref_no,
                "src"       :   $scope.src,
                "user_name" :   $scope.user_name
            };
//            $log.log($scope.formData);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
            	$log.log('ret data :')
                $log.log(data);
                if(data.error== "false")
                {
                    window.location.href='confirm_otp';
                }
                else 
                {
                    alert('Some Problem Occur; Please try after some time');
                }
                
            });
        }
        $scope.checkEM=function()
        {
            $scope.formData = {
                "con"       :   'check_em',
                "user_em"        :   $scope.user_em,
                "user_con"        :   $scope.user_con
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                if(data.reg == 1)
                {
                    $scope.cem='on';
                }
            });
        }
        $scope.checkLog=function()
        {            
            $scope.log.errormsg="Please wait...Checking creadentials.";
            $scope.formData = {
                "con"       :   'check_log',
                "user_em"        :   $scope.user_eml,
                "user_pass"        :   $scope.user_passl
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                if(data.status=="verify")
                {
                    document.cookie = "pro_pic="+data.pro_pic;
                    $scope.log.errormsg="User verification pending...waiting for verification.";
                    $scope.tempuser=data.uid;
                    $scope.modalShown='signotp';
                    $scope.favsDefault();
                    $scope.getUAddress(data.uid);
                }
                else if(data.status=="verified")
                {
                    document.cookie = "pro_pic="+data.pro_pic;
                    $scope.log.errormsg="User verified...Logging in.";
                    $scope.user=data.uid;                    
                    $scope.uid=data.uid;      
                    $scope.bd=$scope.getBd();
                    $scope.modalWin=false;
                    $scope.favsDefault();
                    $scope.getUAddress(data.uid);
                }
                else
                {
                    $scope.log.errormsg="Wrong Credentials please check";
                }
                $log.log(data);
                $log.log('xxxxxxxxxxxxxx');
            });
        };
        $scope.checkOTP=function(otptype)
        {            
            $scope.formData = {
                "con"       :   'check_otp',
                "otp"        :   $scope.otp
            };
//            alert(otptype);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                if(data == '"verified"')
                {
                    if(otptype=='gen')
                    {
                        $scope.modalWin=false;
                    } 
                    else if(otptype=='check')
                    {
                        window.location.href='index';
                    }                    
                }
                else
                {
                }
            });
        }
        $scope.checkEM2=function()
        {
            $scope.formData = {
                "con"       :   'check_em2',
                "user_em"   :   $scope.user_emfp
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $log.log(data);
                if(data == 1)
                {
                    $scope.modalShown='chngpass';
//                    $scope.requestOtp($scope.user_emfp);
                }
            });
        };
        $scope.requestOtp=function(em)
        {
            $scope.formData = {
                "con"           :   'req_otp',
                "user_em"       :   em
            };
            alert(em);
            $http({
                method  :   'POST',
                url     :   'scripts/qfinder',
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                    $log.log(data);
//                alert('called');
                if(data == 1)
                {
                    
//                    $scope.redturl='reset_password?em='+btoa($scope.user_emfp);
////                    $log.log($scope.redturl);
//                    window.location.href=$scope.redturl;
                }
            });
        };
        $scope.checkReset=function()
        {          
            if($scope.user_pass!='' && $scope.user_pass2!='')
            {
                if($scope.user_pass==$scope.user_pass2)
                {
                    if($scope.otp!='')
                    {
                        $scope.formData = {
                            "con"       :   'otp_reset',
                            "otp"       :   $scope.otp,
                            "ps"        :   $scope.user_pass,
                            "em"        :   $scope.user.email
                        };
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.formData,
                            headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                        })
                        .success(function(data){
                        $log.log(data);
                        $scope.message=[];
                        if(data.error == 'false')
                        {                            
                            alert('Your Password has been changed');
                            $scope.message.error='false';
                            $scope.message.tag='Loging in to dashboard';
                            $scope.modalShown='login';
                        }
                        else
                        {
                            $scope.message.error='true';
                            $scope.message.tag='OTP does not matched. Please insert correct OTP';
                        }
                    });                    
                    }
                    else
                    {
                        $scope.message.error='true';
                        $scope.message.tag='Please provide the OTP sent to your registered number';
                    }
                }                
                else
                {
                    $scope.message.error='true';
                    $scope.message.tag='Both password have to be same';
                }
            }
            else
            {
                $scope.message.error='true';
                $scope.message.tag='Password and Confirm password are mandatory';
            }             
        };        
        $scope.changePhNew=function()
        {
            document.getElementById('btn_cph').disabled=true;
            $scope.formData = {
                "con"       :   'sendOTPph'
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log(data);
                $scope.modalWin=true;
                $scope.modalShown='up_eml';
            });
        }        
        $scope.changeEmNew=function()
        {
            document.getElementById('btn_cph').disabled=true;
            
            $scope.formData = {
                "con"       :   'sendOTPem'
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                alert();
                $log.log(data);
                $scope.modalWin=true;
                $scope.modalShown='up_phn';
            });
        }        
        $scope.checkResetPhn=function()
        {                      
            
            if($scope.con1!='' && $scope.con2!='')
            {
                if($scope.con1==$scope.con2)
                {
                    if($scope.otpPh!='')
                    {
                        document.getElementById('btn_crp').disabled=true;
                        $scope.formData = {
                            "con"       :   'changePh',
                            "otp"       :   $scope.otpPh,
                            "con1"        :   $scope.con1
                        };
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.formData,
                            headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                        })
                        .success(function(data){
                            document.getElementById('btn_crp').disabled=false;
                            if(data.error=='false')
                            {
                                alert(data.msg);
                            }
                            else
                            {
                                alert(data.msg);
                                $scope.modalWin=false;
                                $scope.modalShown='';
                            }
                            document.getElementById('btn_cph').disabled=false;
                        });                    
                    }
                    else
                    {
                        $scope.message.error='true';
                        $scope.message.tag='Please provide the OTP sent to your registered number';
                    }
                }                
                else
                {
                    $scope.message.error='true';
                    $scope.message.tag='Both New Contact Number have to be same';
                }
            }
            else
            {
                $scope.message.error='true';
                $scope.message.tag='New Contact Number and Confirm New Contact Number are mandatory';
            }             
        };
        $scope.checkResetEm=function()
        {          
            
            if($scope.eml1!='' && $scope.eml2!='')
            {
                if($scope.eml1==$scope.eml2)
                {
                    if($scope.otpPh!='')
                    {
                        document.getElementById('btn_cem').disabled=true;
                        $scope.formData = {
                            "con"       :   'changeEml',
                            "otp"       :   $scope.otpem,
                            "con1"        :   $scope.eml1
                        };
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.formData,
                            headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                        })
                        .success(function(data){
                            document.getElementById('btn_cem').disabled=false;
                            if(data.error=='false')
                            {
                                alert(data.msg);
                            }
                            else
                            {
                                alert(data.msg);
                                $scope.modalWin=false;
                                $scope.modalShown='';
                            }
                            document.getElementById('btn_cem').disabled=false;
                        });                    
                    }
                    else
                    {
                        $scope.message.error='true';
                        $scope.message.tag='Please provide the OTP sent to your registered number';
                    }
                }                
                else
                {
                    $scope.message.error='true';
                    $scope.message.tag='Both New Contact Number have to be same';
                }
            }
            else
            {
                $scope.message.error='true';
                $scope.message.tag='New Contact Number and Confirm New Contact Number are mandatory';
            }             
        };
        /*reg sec*/
        $scope.errorx=[];
        $scope.checkAll=function()
        {
            $scope.errorx.un=false;
            $scope.errorx.up=false;
            $scope.errorx.up2=false;
            $scope.errorx.em=false;
            $scope.errorx.con=false;
            $scope.valid=0;
            if($scope.user_pass=='' || $scope.user_pass==null)
            {
                $scope.message.type='error';
                $scope.message.error='Passwords did not matched';
                $scope.valid=$scope.valid+1;
                $scope.errorx.up=true;
            }
            else
            {
                if($scope.user_pass!=$scope.user_pass2)
                {
                    $scope.message.type='error';
                    $scope.message.error='Passwords did not matched';
                    $scope.valid=$scope.valid+1;
                    $scope.errorx.up2=true;
                }
                if($scope.user_pass2=='' || $scope.user_pass2==null)
                {
                    $scope.valid=$scope.valid+1;
                    $scope.errorx.up2=true;
                }
                else
                {
                    $scope.errorx.up2=false;
                }
            }
//            alert('on com1');
            if($scope.user_em=='' || $scope.user_em==null)
            {
                $scope.valid=$scope.valid+1;
                $scope.errorx.em=true;
            }
            else
            {       
                $scope.errorx.em=false;
                $scope.checkEM($scope.user_em);
                if($scope.cem=='on')
                {
                    $scope.errorx.em=true;
//                    alert('Already Registared With Email please login');
                    $scope.message.type='error';
                    $scope.message.error='Already Registared With Email /Contact Number.';
                    $scope.login=1;
                }       
                
            }
//            alert('on com2');
            if($scope.user_name=='' || $scope.user_name==null)
            {
                $scope.errorx.un=true;
                $scope.valid=$scope.valid+1;
            }
//            alert('on com3');
            if($scope.user_con=='' || $scope.user_con==null)
            {
                $scope.errorx.con=true;
                $scope.valid=$scope.valid+1;
            }
//            alert('on com4');
//              alert($scope.valid);
            if($scope.valid==0)
            {
//                alert('on com');
                if($scope.tnc)
                {
//                    alert('final');
                    $scope.subForm();
                }
                else
                {
                    alert('Please select Terms and condition box');
                }   
//                alert('exit');
            }
        };        
        $scope.subForm=function()
        {
            //alert('here1');
            $scope.formData = {
                "con"       :   'reg',
                "user_em"   :   $scope.user_em,
                "user_pass" :   $scope.user_pass,
                "user_con"  :   $scope.user_con,
                "ref_no"    :   $scope.ref_no,
                "src"       :   $scope.src,
                "user_name" :   $scope.user_name
            };
//           $log.log($scope.formData);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log(data);
                if(data.error== "false")
                {
                    $scope.modalWin=false;
                    $scope.modalShown='signotp';
                }
                else 
                {
                    alert('Some Problem Occured; Please try after some time');
                }
                
            });
        }
        
        
        
        /*reg sec*/
        $scope.getUAddress=function(uid)
        {
            $scope.params = 
            {
                "con"   :   "get_u_address",
                "uid"    :   uid
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {  
//                    $log.log(data);
//                     $log.log('>>>>');
                    $scope.uaddr=data;
            });
        }
        $scope.setUAddress=function()
        {
//            alert();
            $scope.params = 
            {
                "con"   :   "set_u_address",
                "uid"    :   $scope.user,
                'street'    :   $scope.frmna.addr,
                'city'      :   $scope.frmna.city,
                'pin'      :   $scope.frmna.pin,
                'state'    :  $scope.frmna.state,
                'ret'       :   'true'
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) { 
//                    $log.log('xxxxxxxxxxxxxxx');
//                    $log.log(data);
                    $scope.uaddr=data;
            });
        }
        $scope.getTags=function(tb,id,ret)
        {
            $scope.params = 
            {
                "con"   :   "getTags",
                "tab"    :   tb,
                'id'    :   id,
                'ret'   :   ret
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) { 
//                    $log.log('xxxxxxxxxxxxxxx');
//                    $log.log(data);
                    $scope.tags=data;
            });
        }
        $scope.logout=function()
        {
            
            $scope.formData={'con':'logout'};
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){ 
                $scope.modalWin=false;
                $scope.modalShown='';
                if($scope.otptype=='check')
                {
                    window.location.href='index';
                }
                $scope.user='gen';  
                $scope.bd=$scope.getBd();
            });
        }        
        $scope.showHor=function()
        {
            $scope.modalWin=true;
            $scope.modalShown='horoscope';
        }
        /*Registration RELATED*/        
        /*********this is for getting the favorites of a specific user**********/
        $scope.favs=function()
        {
            $scope.favsi=getCookie('favsi');
            $scope.formData = {
                "con"       :   'get_user_fav',
                "uid"        :   $scope.user    
            };
            if($scope.favsi=='')
            {
                $http({
                    method  :   'POST',
                    url     :   $scope.url,
                    data    :   $scope.formData,
                    headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                })
                .success(function(data){
                    document.cookie = "favsi="+data+";";
                    var strx=data;
                    strx=strx.replace('"','');
                    var data_array = strx.split(',');
                    $log.log(data_array);
                    $scope.favsidp = data_array;
                });
            }
            else
            {
                var strx=$scope.favsi;
                strx=strx.replace('"','');
                var data_array = strx.split(',');
                $log.log(data_array);
                $scope.favsidp = data_array;
            }
        };        
        /*** sets favs on login ***/
        $scope.favsDefault=function()
        {
            $scope.formData = {
                "con"       :   'get_user_fav',
                "uid"       :   $scope.user
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                document.cookie = "favsi=" + data + ";";
                var strx=data;
                strx=strx.replace('"','');
                var data_array = strx.split(',');
                $log.log(data_array);
                $scope.favsidp = data_array;
            });
        };
        /**Sets the delivary address of the user**/
        $scope.setAddr=function(ind)
        {
            $scope.addrsel=ind;
            $scope.showBook='true';
//            alert($scope.addrsel);
        }
        $scope.setAddr2=function(addr)
        {
            $scope.dellocx=addr;
            $scope.modalWin=false;
//            alert($scope.addrsel);
        }
        $scope.setAddr3=function(addr)
        {
//            alert($scope.upitm);
            $scope.formData = {
                "con"       :   'setAddrCart',
                "upitm"     :   $scope.upitm,
                "addr"      :   addr
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log(data);
                $scope.getCartUpdate();
            });
        }
        $scope.showAddrEdt=function(idx)
        {
            $scope.upitm=idx;
            $scope.modalShown='edtLoc';
            $scope.modalWin=true;
            
        }
        /*********** add items to cart ************/
        $scope.add2c=function(d1,d2,d3)
        {
            $scope.updata=1;
            if(d1!='coupon')
            {
                if(d1=='puja')
                {
                    alert();
                    d3=$scope.fea_det[0].puja_pack[0].pp_id;
                    $scope.params = {
                    "con"       :   "add2c_item",
                    "uid"       :   $scope.uid,
                    "type"      :   d1,
                    'item'      :   $scope.selAdnItm,
                    'subfea'    :   d3+','+$scope.dtpick+','+$scope.sel_city_puja+','+$scope.puja_type+','+$scope.pt_radio+','+$scope.uaddr[$scope.addrsel]['udl_id']
                    };
                    $log.log('Params');
                    $log.log($scope.params);
                    $http({
                        method  :   'POST',
                        url     :   $scope.url,
                        data    :   $scope.params,
                        headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) 
                    {
                        $scope.alerts('alertsuc','Product added to cart...');
    //                    $log.log(data);
                        $scope.updata=0;
                    });
                }
                else 
                {
                    if($scope.printed==1)
                    {
                        d3=$scope.dellocx;
                        var d2id=d2.clone;
                    }
                    else
                    {
                        var d2id=d2.fea_id;
                    }
                    $scope.params = {
                    "con"       :   "add2c_item",
                    "uid"       :   $scope.uid,
                    "type"      :   d1,
                    'item'      :   d2id,
                    'subfea'    :   d3
                    };
    //                $log.log($scope.params);
                    $http({ 
                        method  :   'POST',
                        url     :   $scope.url,
                        data    :   $scope.params,
                        headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function(data) 
                    {
                        $scope.alerts('alertsuc','Product added to cart...');
    //                    $log.log(data);
                        $scope.updata=0;
                    });
                }
            }
            else
            {
                $scope.params = {
                "con"       :   "add2c_item",
                "uid"       :   $scope.uid,
                "type"      :   d1,
                'item'      :   document.getElementById('coupon2').value
                };
                $http({
                    method  :   'POST',
                    url     :   $scope.url,
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
                {
                    $scope.alerts('alertsuc','Coupon applied...');
                    $scope.updata=0;
                });               
            }
//            $scope.getCartUpdate();
        };
        /*********** adds / deducts items to cart ************/
        $scope.add2c1=function(d1,d2,d3)
        {
            $scope.updata=1;            
            $scope.params = {
            "con"       :   "add2c_item",
            "uid"       :   $scope.uid,
            "type"      :   d1,
            'item'      :   d2.item_id,
            'subfea'    :   d3
            };
//                $log.log($scope.params);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data) 
            {
                $scope.alerts('alertsuc','Product added to cart...');
                $scope.updata=0;
                $scope.getCartUpdate();
            });            
            
        };                
        /*********** adds / deducts items to cart ************/
        $scope.delfc1=function(d1,d2,d3)
        {
            $scope.updata=1;   
            if(d1=='puja')
            {
                $scope.params = {
                "con"       :   "dedfc_item",
                "uid"       :   $scope.uid,
                "type"      :   d1,
                'item'      :   d2.tc_id,
                'ded_type'  :   d3
                };
            }
            else
            {
                $scope.params = {
                "con"       :   "dedfc_item",
                "uid"       :   $scope.uid,
                "type"      :   d1,
                'item'      :   d2.item_id,
                'ded_type'  :   d3
                };
            }
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data)
            {
                $scope.alerts('alertdanger','Item Deducted from cart...');
//                    $log.log(data);
                $scope.updata=0;                        
                $scope.getCartUpdate();
            });    
        };
        $scope.delfc2=function(d1,d2,d3)
        {
            $scope.updata=1;            
            $scope.params = {
            "con"       :   "dedfc_item",
            "uid"       :   $scope.uid,
            "type"      :   d1,
            'item'      :   d2,
            'ded_type'  :   d3
            };
//                $log.log($scope.params);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data)
            {
                $scope.alerts('alertdanger','Item Deducted from cart...');
//                    $log.log(data);
                $scope.updata=0;                        
                $scope.getCartUpdate();
            });    
        };
        /*************updates current cart items*****************/
        $scope.getCartUpdate=function()
        {
            $scope.cntCart=0;
            $scope.updata=1;            
            $scope.params = 
            {              
                "con" :   "updateCart"
            };
            $http({
            method  :   'POST',
            url     :   $scope.url,
            data    :   $scope.params,
            headers :   {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) 
            {
                $scope.cart_main=data;
                $log.log($scope.cart_main);
                $scope.c_gt=0;
                $scope.c_total=0;
                $scope.c_cou='';
                $scope.c_dis=0;
                $scope.c_ap=0;
//                    $log.log('items : ');
                angular.forEach($scope.cart_main.cart, function(value, key) 
                {
                    $scope.cntCart=$scope.cntCart+1;
                    if(value.item_type!='coupon')
                    {
                          $scope.c_total=parseFloat($scope.c_total)+parseFloat(value.item_total);
                    }
                    else
                    {
                          $scope.c_dis=parseFloat(value.item_total);
                    }
                });
                $scope.c_gt=$scope.c_total-$scope.c_dis;
                $scope.c_dis=0;
                $scope.updata=0;
//                alert();
            });            
        };
        $scope.coupn=[];
        /**************** shows alert window *********************/
        $scope.alerts=function(type,message)
        {  
            document.getElementsByClassName('alertsuc').className = "hid5";
            document.getElementsByClassName('alertdanger').className = "hid5";
            
            var svg = '<div class="'+type+'"><i class="icon fa fa-ban"></i>&nbsp;&nbsp;&nbsp;<span>'+message+'</span></div>';
//            $scope.getAddedSer($scope.bd.user_id);
            var div_alert = angular.element(document).find('ab').eq(0);
            div_alert.prepend(svg);
//            $log.log($scope.conItem);
        };
        /********************** places final order ****************/
        $scope.place_final_order=function()
        {
            $scope.updata=1;
            $scope.params = 
            {              
                "con"   :   "place_main_order"
            };            
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    $log.log(data);
                    $scope.updata=0;
                    $scope.alerts('alertgreen',"Your purchase is complete.<a href='https://www.myfuturemirror.com/dev_area/astro_asso/main_site/user/orders'>Click here</a> to show details of your order.");
                    $scope.getCartUpdate();
                    modalShown='';
                    modalWin=false;
//                    $scope.changeTab(4);
//                    $scope.getPurFea();
                    
            });            
        };
        $scope.getCities=function()
        {
            $scope.params = 
            {              
                "con"   :   "getcities"
            };            
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
                {
                    $scope.allCities=data;                    
                });           
        };
        $scope.getPujaAvail=function()
        {
            
        };
        $scope.addon=function(id)
        {
            alert(document.getElementById("sel"+id).selected);
        };
        $scope.model_set_type=function(id,con)
        {
            alert(id);
            $scope.sel[id]=con;
        };
        $scope.selecteditm=[];
        $scope.showPrice = function()
        {
            $scope.selAdnItm=[];
            $scope.itemcart=[];
            $scope.itemcart=[];
            $scope.of_avail=false;
            $scope.on_avail=false;
            $scope.pujatotal='';
            $scope.itmz=[];
            if($scope.puja_type=='basic')
            {
                $scope.itmz.item='basic Puja';
                $scope.itmz.itemOR='';
                $scope.itmz.itemt='puja';
                $scope.itmz.spec='';
                $scope.itmz.price=parseFloat($scope.fea_det[0].puja_pack[0].package_price);
                $scope.itemcart.push($scope.itmz);
                $scope.pujatotal=parseFloat($scope.fea_det[0].puja_pack[0].package_price);
            }
            else if($scope.puja_type=='pre')
            {
                $scope.itmz.item='Premium Puja';
                $scope.itmz.itemOR='';
                $scope.itmz.itemt='puja';
                $scope.itmz.spec='';
                $scope.itmz.price=parseFloat($scope.fea_det[0].puja_pack[0].premium_price);
                $scope.itemcart.push($scope.itmz);
                $scope.pujatotal=parseFloat($scope.fea_det[0].puja_pack[0].premium_price);
            }
            $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
            angular.forEach($scope.fea_det[0].puja_pack[0].addons, function(value, key)
            {
//                $scope.sel[value.item_name]='';
                var e=document.getElementById('sel'+value.item_name);
                var x=e.options[e.selectedIndex].value;
                $scope.itmz=[];
//                $log.log(x);
                if(x!=="")
                {       
                    $scope.itmz.item=value.item_name;
                    $scope.itmz.itemOR='';
                    $scope.itmz.itemt='item';
                    $scope.itmz.spec=value.items[x].item_quantity;
                    $scope.itmz.price=parseFloat(value.items[x].price);
                    $scope.itemcart.push($scope.itmz);
                    
                    $scope.selAdnItm.push(value.items[x]);
//                    $log.log($scope.selAdnItm);
//                    $log.log('Value var: ');
//                    $log.log(value.items[x]);
                    $scope.pujatotal=parseFloat($scope.pujatotal)+parseFloat(value.items[x].price);
                    $scope.timeDure=parseFloat($scope.timeDure)+parseFloat(value.items[x].time);
                }
            });
        };
        $scope.swtPujaType=function(type)
        {
            $scope.puja_type=type;
            $scope.showPrice();
        }
        $scope.modalShown1='';
        
        $scope.pujaAvail=function()
        {
            alert();
            $scope.showPrice();
//            alert('x');
            if($scope.sel_city_puja=='')
            {
                alert('please select city');
            }
            else
            {
                var dt=document.getElementById('puja_dt').value;
//                alert($scope.fea_det[0]['puja_id']);
                $scope.params = 
                {              
                    "con"   :   "getPujaAvail",
                    "date"  :   $scope.dtpick,
                    "city"  :   $scope.sel_city_puja,
                    "puja"  :   $scope.fea_det[0]['puja_id']
                };
                $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) 
                {
                    $log.log(data);
                    $log.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
                    if($scope.pt_radio=='off')
                    {
                        if(data.offline>0)
                        {
                            $scope.of_avail=true;
                            $scope.showBookbtn=true;
                            $scope.orPujaItmTemp();
                        }
                        else
                        {
                            $scope.of_avail=false;
                            $scope.showBookbtn=false;
                        }
                    }
                    if($scope.pt_radio=='on')
                    {
                        if(data.online>0)
                        {
                            $scope.on_avail=true;
                            $scope.showBookbtn=true;
                            $scope.orPujaItmTemp();
                        }
                        else
                        {
                            $scope.on_avail=false;
                            $scope.showBookbtn=false;
                        }
                    }
                });
            }
        }
        $scope.orPujaItmTemp=function()
        {
            $scope.tempTotal=0;
            $scope.junk=$scope.itemcart;
            $scope.itmTemp=[];
            $scope.varaap='';
            if($scope.fea_det[0].puja_pack[0]['ori'][0].city=='false')
            {
                $scope.varaap=true;
            }
            else
            {
                var ix1=0;
                angular.forEach($scope.fea_det[0].puja_pack[0]['ori'][0].cities_avail, function(value, key)
                {
                    if(value.city_name==$scope.sel_city_puja)
                    {
                        ix1=ix1+1;
                    }
                });
                if(ix1==0)
                {
                    $scope.varaap=false;
                }
                else
                {
                    $scope.varaap=true;
                }
            }
            if($scope.varaap==true)
            {
                angular.forEach($scope.junk, function(value, key)
                {
                    if(value.itemt=='puja')
                    {
                        if($scope.puja_type=='pre')
                        {
                            alert($scope.fea_det[0].puja_pack[0]['ori'][0].premium);
                            value.itemOR=parseFloat($scope.fea_det[0].puja_pack[0]['ori'][0].premium);
                        }
                        else
                        {
                            value.itemOR=parseFloat($scope.fea_det[0].puja_pack[0]['ori'][0].base);
                        }  
                    }
                    else if(value.itemt=='item')
                    {
                        angular.forEach($scope.fea_det[0].puja_pack[0]['addons'], function(value2, key2)
                        {
                            if(value2.item_name==value.item)
                            {
                                angular.forEach(value2.items, function(value21, key21)
                                {
                                    if(value21.item_quantity==value.spec && value21.or_avail=="true")
                                    {
                                        value.itemOR=value21.ori.price;
                                    }
                                });
                            }                            
                        });
                    }
                    if(value.itemOR=='')
                    {
                        $scope.tempTotal=parseFloat($scope.tempTotal)+parseFloat(value.price);
                    }
                    else
                    {
                        $scope.tempTotal=parseFloat($scope.tempTotal)+parseFloat(value.itemOR);
                    }
                    $scope.itmTemp.push(value);
                });
                $scope.itemcart=$scope.itmTemp;
            }
            $scope.pujatotal=$scope.tempTotal;
            $log.log('temp total'+$scope.tempTotal);
        }        
        $scope.getNumberx = function(par, type)
        {
            if(type == 1){
                return new Array(par);
            }else{
                var n = Math.ceil(par/type);

                return new Array(n);   
            }
        };
        $scope.getBlogList=function(type)
        {
            $scope.formData = {
                "con"       :   'get_any_post',
                "val"       :   0,
                "type"      :   type,
                "wc"        :   ''
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                $log.log('Items of data in blog');
                $scope.posts=data;
                $log.log($scope.posts);
//                $log.log('Items of data in blog');
            });
        };
        $scope.getPurServ=function(val)
        {
            if(val=='all')
            {
                $scope.getPurServ('pending');
                $scope.getPurServ('requested');
                $scope.getPurServ('used');
                $scope.getPurServ('expired');
            }
            else
            {
                $scope.formData = {
                    "con"       :   'get_pur_fea_wt',
                    "val"       :   0,
                    "type"      :   val
                };
            }            
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $log.log(data);
                if(val=='pending')
                {
                    $scope.cItm=data;
                    $scope.servs.pending=data;
                }
                if(val=='requested')
                {
                    $scope.cItm=data;
                    $scope.servs.requested=data;
                }
                if(val=='used')
                {
                    $scope.cItm=data;
                    $scope.servs.used=data;
                }
                if(val=='expired')
                {
                    $scope.cItm=data;
                    $log.log('expired');
                    $scope.servs.expired=data;
                }                
            });
        }
        $scope.viewConItem=function(type,index)
        {
            $scope.serv_type='Consume Service';
            $scope.itm_det=$scope.servs[type][index];
//            $log.log('itm_det');
//            $log.log($scope.itm_det);
            $scope.servCon='true';
            if(!angular.isDefined($scope.bd.all))
            {
                $scope.getAllBd();
            }
            if($scope.bd.all==[] || $scope.bd.all=='null')
            {
                $scope.getAllBd();
            }
        }
        $scope.viewConDet=function(type,index)
        {
            $scope.serv_type='Item Details';
            $scope.itm_det=$scope.servs[type][index];
            $log.log('itm_det');
            $log.log($scope.itm_det);
            $scope.servCD='true';
        }
        $scope.retWhere=function(type)
        {
            $scope.servCD='false';
            $scope.servCon='false';            
            if(type=='pending')
            {
                $scope.serv_type='Pending Services';                
            }
            if(type=='used')
            {
                $scope.serv_type='Used Services';                
            }
            if(type=='expired')
            {
                $scope.serv_type='Expired Services';                
            }
            if(type=='requested')
            {
                $scope.serv_type='Requested Services';                
            }
        }
        $scope.getAllBd=function(uid)
        {
            $scope.formData = {
                "con"       :   'get_all_bd'
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                if(angular.isDefined($scope.bd))
                {
                    $scope.bd.all=[];
                }
                else
                {
                    $scope.bd=[];
                    $scope.bd.all=[];
                }
                $scope.all.bd=data;
                $log.log($scope.bd);
            });
        };
        $scope.showUpProBD=function(index)
        {
            alert();
            alert($scope.bd.all[index].name);
            $scope.modalWin=true;
            $scope.modalShown='bd_update';
//            $scope.formData = {
//                "con"       :   'get_all_bd'
//            };
//            $http({
//                method  :   'POST',
//                url     :   $scope.url,
//                data    :   $scope.formData,
//                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
//            })
//            .success(function(data){
//                $scope.bd.all=data;
//                $log.log(data);
//            });
        }
        $scope.fnArrFrmYr = function(par)
        {
            par=parseInt(par)-1950;
            return new Array(par);   
        };
        /* selects birth details for service consumption */
        $scope.setConBD=function(index)
        {
//            $log.log('index'+index);
            $scope.pro1=$scope.all.bd[index];
            $log.log($scope.all.bd);
            $log.log('index');
            $scope.bdConServ=index;
            if($scope.itm_det.fea_id==292)
            {
                 alert();
            }
            else
            {
                if($scope.itm_det.fea_det[0].ctype=='lc')
                {
                    if(angular.isDefined($scope.date_tc) && angular.isDefined($scope.time_tc1) && angular.isDefined($scope.time_tc2))
                    {
                        $scope.modalWin=true;
                        $scope.modalShown='bd_confirm';
                    }
                    else
                    {
                        alert('please Select a prefered date for conference');
                    }
                }
                else
                {
                    $scope.modalWin=true;
                    $scope.modalShown='bd_confirm';
                }            
            }
            alert('Placing');
        }
        /* request for consumption of a service */
        $scope.reqServiceCon=function()
        {
            $scope.pd=[];
            $scope.pd.date=$scope.date_tc;
            $scope.pd.time=$scope.time_tc1+':'+$scope.time_tc2;
            $scope.formData = {
                "con"       :   'req_ser_consume1',
                'fea_id'    :   $scope.itm_det.fea_det[0].fea_id,
                'bd_id'     :   $scope.pro1.bd_id,
                'dt'        :   $scope.pd
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $scope.modalShown='';
                $scope.modalWin=false;
                if(data.error=='TRUE')
                {
                    $scope.alerts('alertdanger',data.message);
                }
                else
                {
                    $scope.alerts('alertsuc',data.message);
                    $scope.getPurServ('all');
                    $scope.servCD='true';
                    $scope.servCon='false';
                }
            });
        }
        /* gets report id wrt id provided */
        $scope.repIdFromUFU=function(id,index)
        {
            if(id!=undefined)
            {
                $log.log(id+"Rprt Id .....: "+index);
                $scope.formData = {
                    "con"       :   'get_rep_id',
                    'asl'    :   id
                };
                $http({
                    method  :   'POST',
                    url     :   $scope.url,
                    data    :   $scope.formData,
                    headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                })
                .success(function(data){
                    $log.log("Rprt Id : ");
                    $log.log(data);
                    $scope.report_id[index]={};
                    if(!angular.isDefined(data[0]) || data[0].report_id==0)
                    {
                        
                            $scope.report_id[index].id='pending';
                        
                    }
                    else
                    {
                        $scope.report_id[index].id=data[0].report_id;
                    }

                });
            }
        }
        /* Could not remember */
        $scope.callerDta=function(dta)
        {
            $log.log('req..................................');
            $log.log($scope.fest_dta);
            $scope.fes_itms=$scope.fest_dta[dta];
//            $log.log($scope.fes_itms);
        }
        $scope.setModFes=function(itms)
        {
            $scope.desc_fes=itms;
        }
        /* on change of the calender date */
        $scope.dataUpdated=function(dt)
        {
            var type='';
            var d = new Date(dt);
            $scope.formData = {
                "con"     :   'get_fest',
                'type'    :   type,
                'month'   :   d.getUTCMonth()+1,
                'year'    :   d.getUTCFullYear(),
                'fest_id'    :   0
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $scope.fest_dta=data;
                angular.forEach(data, function(value, key)
                {
                    if(value.length>0)
                    {
//                        angular.forEach(value, function(value2, key2)
//                        {
//                            document.getElementById(key).innerHTML=document.getElementById(key).innerHTML+'<br/>'+value2['fes_name'];
//                        });
                            var x1=document.getElementById(key);
//                        angular.forEach(value, function(value2, key2)
//                        {
//                            document.getElementById(key).innerHTML='aa';
//                        });
                        x1.className='mgf';
                    }
                });
            });
        }
        
        $scope.getFeaAll=function()
        {
            $scope.formData = {
                "con"     :   'get_fea_all',
                'type'    :   type,
                'month'   :   d.getUTCMonth()+1,
                'year'    :   d.getUTCFullYear(),
                'fest_id'    :   0
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $scope.fest_dta=data;
                angular.forEach(data, function(value, key)
                {
                    if(value.length>0)
                    {
                        angular.forEach(value, function(value2, key2)
                        {
                            document.getElementById(key).innerHTML=document.getElementById(key).innerHTML+'<br/>'+value2['fes_name'];
                        });
                    }
                });
            });
        }
        /* updates all scopes for city being changed on the puja section */
//        $scope.cc_disable_all=function()
//        {
//            alert();
//            $scope.showBookbtn='false';
//            $scope.showPrice();
//        }
        /***************
         * 
         * 
         *      End Of Main Code
         *  
         * 
         ******************/
        $scope.showUp=function(type,ind)
        {
            if(type=='bd')
            {
                
                $scope.modalWin=true;
                $scope.modalShown='bd_update';
                $scope.hform=$scope.all.bd[ind];
            }
        }
        $scope.change_bd=function(bd_id)
        {
            alert(bd_id);
        }        
        $scope.getOverPHR=function(phr)
        {
//            alert(phr);
            if(phr=='planet_house_report')
            {
                $scope.formData = {
                    "con"     :   'general_house_report'
                };
            }
            if(phr=='planet_sign_report')
            {
                $scope.formData = {
                    "con"     :   'general_rashi_report'
                };
            }
            if(phr=='ascendant_report')
            {
                $scope.formData = {
                    "con"     :   'general_ascendant_report'
                };
            }           
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
//                alert('success');
                $scope.phr=data;
                $log.log('planet');
                $log.log(phr);
                $log.log($scope.phr);
            });
        }
        
        /*script of fileupload*/
        $scope.files=[];
        $scope.$on("seletedFile", function (event, args)
        {
            
            $scope.$apply(function () {
                //add the file object to the scope's files collection
                $scope.files.push(args.file);
                $scope.upProImg();
            });
        });

        $scope.upProImg = function()
        {
            document.getElementById('img_loc').disabled=true;
            var newitem = {                    
                 };
//                  var x1=$scope.go_id.toString();
            $http({
                    method: 'POST',
                    url: "scripts/pro_up.php",
                    headers: { 'Content-Type': undefined },

                    transformRequest: function (data) {
                        var formData = new FormData();
                        formData.append("model", angular.toJson(data.model));
                        for (var i=0; i<data.files.length; i++) {
                            formData.append("file" + i, data.files[i]);
                        }
                        return formData;
                    },
                    data: { files: $scope.files }
                }).success(function (data, status, headers, config) {
                document.getElementById('img_loc').disabled=false;
                $scope.pro_pic=atob(data);
            });
        };    
        /*script of fileupload*/
        
        $scope.chngLang=function(textx)
        {
            
        }
        $scope.truHtml=function(id,val)
        {
//            alert(val);
            if(val)
            {
                document.getElementById(id).innerHTML=val.toString();
            }
        }
        $scope.removeTCA=function(id,tc)
        {
            alert(tc);
            $scope.params={"con":'remove_tca',"tca":id,"tc_id":tc};
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : $scope.params,
                
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .success(function(data) 
            {
//                $log.log('_'+id+'++');
                $scope.cart_main.cart=data.cart;
//                $log.log('_+_+++');
            });            
        }
        $scope.togglePrinted=function()
        {
            if($scope.printed==1)
            {
                $scope.printed=0;
            }
            else
            {
                $scope.printed=1;
                $scope.modalWin=true;
                $scope.modalShown='delLoc';
            }
        }
        
        $scope.viewMapMarkers=function()
        {
            alert();
            $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'get_temples',"templ":0},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                }).success(function (data) {    
                    var i=0;
                    var features=[];
                    $log.log('test datax');
                    $log.log(data);
                    angular.forEach(data.temples, function(value, key) {
                        features[key]=[
                        {
                          position: new google.maps.LatLng(value.lalitude, value.longitude),
                          type: 'temple',
                          info: 'This is custom',
                          desc: data.temp_id
                        }
                        ];
                        i=i+1;
                    });
                    mapMrkr(features);
//                        var features = [
//                        {
//                          position: new google.maps.LatLng(22.498366, 88.347717),
//                          type: 'temple',
//                          info: 'This is custom'
//                        }
//                      ];
                });
            

            
        }
        
        $scope.showTempleDet=function(id)
        {
            $scope.tmplNow=[];
            $scope.modalShown='templs';
            $scope.modalWin=true;
            $scope.tmplNow=$scope.templeData[id];
            $log.log($scope.tmplNow);$log.log($scope.templeData);
            
        }
        
        $scope.submitQuery=function(pagex,modelx)
        {
            document.getElementById('inpsq1').disabled=true;
            $scope.itemData=modelx;
             $scope.formData = {
                "con"       :   'updateQuery',
                'data'      :   $scope.itemData,
                'page'      :   pagex
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .success(function(data){
                $log.log(data);
                alert("Thank You for Contacting Us");
                document.getElementById('inpsq1').disabled=false;
            });
        }
        
        $scope.showSuprt=function()
        {
            modalShown='suprt';modalWin=true;
        }
        
        $scope.pujaCheckGroup=function()
        {
//            $log.log($scope.fea_det[0]);
            if($scope.fea_det[0]['puja_pack'][0]['group']==1)
            {
                return;
//                alert('group');
//                if($scope.fea_det[0]['puja_pack'][0]['online_type']=='online')
//                {
//                    alert('online_typeonline');
//                    document.getElementById('pdty2').disabled=true;
//                    $scope.modalShown='del_mod1';$scope.modalWin=true;
//                }
//                else
//                {
//                    alert('online_typeoff');
//                    document.getElementById('pdty1').disabled=true;
//                    $scope.modalShown='puja';$scope.modalWin=true;
//                    
//                }                
            }
            else
            {
                $scope.modalShown='puja';$scope.modalWin=true;
            }
            
        }
        
        $scope.getWallet=function()
        {
            $scope.wallet=[];
            $scope.params = 
            {
                "con"    :   "get_wallet",
                "uid"       :   $scope.uid
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function(data) {
                    $log.log(data);
                    $log.log('wallet Value>>>>>>>');
                    $scope.wallet=data;
                    if(data=={})
                    {
                        $scope.wallet.wallet_amount=0;
                    }
            }); 
        };
        
        
     document.getElementById('xxxx').style.display='none';   
    }]);

    appIndex.service('adminService', ['$http', function($http){   
    this.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i < max; i += step) {
            input.push(i);
        }
        return input;
    };

    this.getPager = function(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || 10;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 

 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        //var pages = _.range(startPage, endPage + 1);
        var pages = this.range(startPage, endPage + 1, 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
        }]);

    appIndex.config(['ADMdtpProvider', function(ADMdtp) {
        ADMdtp.setOptions({
            calType: 'gregorian',
            format: 'YYYY/MM/DD',
            default: 'today',
            autoClose: 'true'
        });
    }]);
//                  url     :   $scope.url,


//    appIndex.filter('startFrom', function() {
//        return function(input, start) {
//            start = +start; //parse to int
//            return input.slice(start);
//        }
//    });

    appIndex.directive('uploadFiles', function () {
        return {
            scope: true, //create a new scope
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    var files = event.target.files;
                    //iterate files since 'multiple' may be specified on the element
                    for (var i = 0; i < files.length; i++) {
                        //emit event upward
                        scope.$emit("seletedFile", { file: files[i] });
                    }
                });
            }
        };
    });


    appIndex.filter('spaceless',function() {
    return function(input) {
                if (input) {
                    return input.replace(/\s+/g, '-');    
                }
            }
        });
//    appIndex.module('titleCasing', [])
//    .filter('titleCase', function() {
//      return function(input) {
//        input = input || '';
//        return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//      };
//    });
})();
 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function callModal()
{
    $('#loginModal').modal({
        show: true
    });
}
$('#datepicker').datepicker({
      autoclose: true,
      zIndex : 0,
      format : 'YYYY-MM-DD' 
    });

//$(function () {
//
//  var scope = angular.element("#div1").scope();
//    $('#container').highcharts({
//        chart: {
//            type: 'column'
//        },
//        title: {
//            text: 'Column chart with negative values'
//        },
//        credits: {
//            enabled: false
//        },
//        series: [{
//        name: 'Bar Chart',
//        data: scope.d
//
//        }]
//    });
//});

function callThisFunc(data)
{
    var appElement = document.querySelector('[ng-app=appIndex]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function() {
        $scope.dt1_sel = data;
        $scope.callerDta(data);
    });
}

function checkUpMon()
{
//    alert(document.getElementById('cmy').innerHTML);
//    console.log(x1);
}

function showTempleDet(id)
{
//    alert(id);
    var appElement = document.querySelector('[ng-app=appIndex]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function() {
        $scope.showTempleDet(id);
    });
    
}

function setTemples(req)
{
    var appElement = document.querySelector('[ng-app=appIndex]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function() {
        $scope.templeData = req;        
    });
}
