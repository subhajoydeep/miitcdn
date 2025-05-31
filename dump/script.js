var appAll = angular.module('appAll',['angularUtils.directives.dirPagination','ngMaterial',"ui.bootstrap.modal",'ui.router','ngMeta','ADM-dateTimePicker','ui.bootstrap','mwl.calendar']);

    // configure our routes
    
    // create the controller and inject Angular's $scope
    appAll.controller('mainController', ['$scope', '$http', '$log', '$filter','adminService','$window','$sce','ngMeta','$stateParams','$rootScope','$location','$timeout','$q','calendarConfig', function($scope, $http, $log, $filter,adminService,$window,$sce,ngMeta,$stateParams,$rootScope,$location,$timeout,$q,calendarConfig)
    {
        $log.log("Started ::::::");
        var vm=this;
        
        $scope.defineVars=function(uid)
        {
            $scope.Math = window.Math;
            $scope.lang='en';
            $scope.user=uid;            
            $scope.userLogged='';
            $scope.pageSize=9;
            $scope.currentPage = 0;
            $scope.pageSize = 9;
            $scope.feature_ques = [];
            $scope.qfil = 0;
            $scope.qfil1=0;
            $scope.pnPage=[];
            $scope.pview='';
            $scope.parentIndex=0;
            $scope.actPage=0;
            $scope.defNumEx=0;
            $scope.defVasEx=0;
            $scope.defServEx=0;
            $scope.feaType='';
            $scope.vfeaViews='';
            $scope.tempuser=0;
            $scope.url='scripts/qfinder_main_web';
            $scope.modalWin='false';
            $scope.pujatotal=0;
            $scope.timeDure='';
            $scope.dtpick='';
            $scope.sel_city='Delhi,28.7041,77.1025';
            $scope.of_avail=false;
            $scope.on_avail=false;
            $scope.city_name='Delhi';
            $scope.adn=0;
            $scope.bdConServ=0;
            $scope.dt1_sel='x';
            $scope.date_tc='';
            $scope.time_tc1='00';
            $scope.time_tc2='00';        
            $scope.matrep=[];
            $scope.hform11=[];           
            $scope.hform2=[];
            $scope.tags=[];
            $scope.del_loc=0;
            $scope.otptype='gen';
            $scope.printed=0;
            $scope.templeData={};
            $scope.filePath='blank';
            $scope.dLvl='';
            $scope.ad_deduct='no';
            $scope.cart_main={};
            $scope.cart_item_count=0;
            $scope.genH=0;
            $scope.isNavCollapsed=$scope.isNavCollapsed2=$scope.isNavCollapsedfa= $scope.isNavCollapsedfex= $scope.isNavCollapsedfq= true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;
            $scope.mDta=JSON.parse(atob(document.getElementById("mdta").innerHTML));
            document.getElementById("mdta").innerHTML="";     
            $scope.log=[];
            $scope.viewData=[];      
            $scope.getDet(uid);
            $scope.viewData.panch=1;
            $scope.viewData.fav=1;
//            $scope.panchang =$scope.mDta.panchang;
            if(getCookie('city'))
            {
                $scope.defCity=getCookie('city');
                $scope.mDta.panchangCt=getCookie('city_name');
                $scope.city=decodeURIComponent(getCookie('city'));
            }
            else
            {
                $scope.city='28.7041,77.1025';
                $scope.mDta.panchangCt="Delhi";
            }            
            var dtx1=new Date();
            $scope.panchang={};
            $scope.getPanchang(dtx1.getFullYear()+'/'+(dtx1.getMonth()+1)+'/'+dtx1.getDate());
//            $scope.panchang=$scope.mDta.panchang;
            $scope.calendarView = 'month';
            $scope.viewDate=new Date();
            
        };
            $scope.temp={};
//        $scope.otp;
        $scope.setUID=function(uid)
        {
            $scope.user=uid;
//            alert();
        }
        $scope.closeWin=function()
        {
            $scope.filePath=$scope.dLvl+'blank.php';
        }
        $scope.openWin=function(val,loc)
        {
//            alCert();
            $scope.filePath=$scope.dLvl+'includes/windows/win_'+loc+'.php';
        }
//        $scope.langu='Hindi';
        $scope.mainFunc=function(uid)
        {
//            $scope.user=uid;  
//            $scope.bd=$scope.getBd();
//            $scope.city=getCookie('city');
//            $scope.getCities();
//            if($scope.city=='')
//            {
//                document.cookie = "city=" + '28.7041,77.1025' + ";";
//            }
//            $scope.city_name=getCookie('city_name');
//            if($scope.city_name=='')
//            {
//                document.cookie = "city_name=" + 'Delhi' + ";";
//            }
//            $scope.getPanchang('today');
            
        }
        
        $scope.showGenH=function(val)
        {
            $scope.genH=val;
//            alert(val);
        }
        
        $scope.getDet=function(uid)
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_bd_v1x',"uid":uid},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(dts)
            {
//                $log.log("Into Get det :");
//                $log.log(dts);
                $scope.bd=dts.data['bd'];
                
                if(!angular.isDefined($scope.bd))
                {
                    $scope.bd={};
                    $scope.bd.all={};
                }                
                else
                {
                    $scope.bd.all=dts.data['all_bd'];
                }
                $scope.user=uid;                
                $scope.closeWin();   
                if(uid!='gen')
                {
                    
                    if(dts.data.user.pre_veri=="verify")
                    {
                        $location.path($scope.dLvl+"checkotp").replace().reload(false);
//                        window.location.href='https://www.myfuturemirror.com/checkotp';
                    }
                    else if(dts.data.user.pre_veri=="verified")
                    {
                        if($scope.bd.all.length==0)
                        {
//                            alert($scope.bd.all.length);
//                            alert("$scope.bd.all.length");
                            $location.path($scope.dLvl+"create_birth_details").replace().reload(false);
//                            $scope.openWin('','bd_create');
                        }
                            
//                            $location.path($scope.dLvl+"create_birth_details").replace().reload(false);
//                            window.location.href='https://www.myfuturemirror.com/create_birth_details';
                        
                            if(dts.data['user']['pro_pic']=="")
                            {
                                $scope.proPic='';
                            }
                            else
                            {
                                $scope.proPic=dts.data['user']['pro_pic'];
                            }
                            $scope.user_name=dts.data['user']['fn_u_name'];  
                            $scope.cart_main=[];
                            $scope.cart_main.cart=dts.data['cart'];
                            $scope.globalx.cartdisc=[];

                                $scope.cTotal=0;

                            $scope.showCart=0;
                            if(angular.isDefined($scope.cart_req))
                            {
                                $scope.c_gt=0;
                                $scope.c_total=0;
                                $scope.c_cou='';
                                $scope.c_dis=0;
                                $scope.c_ap=0;
                                $scope.cTotal=0;
                                $scope.totDisc=0;
                                $scope.statDisc=0;
                                angular.forEach($scope.cart_main.cart, function(value, key) 
                                {
                                    if(value.item_type=='coupon')
                                    {
                                          $scope.totDisc=parseFloat(value.item_total);
                                    }
                                });
                                angular.forEach($scope.cart_main.cart, function(value, key) 
                                {
                                    $log.log('Value item :');
                                    $log.log(value);
                                    $scope.cntCart=$scope.cntCart+1;
                                    if(value.item_type!='coupon')
                                    {
                                          $scope.c_total=parseFloat($scope.c_total)+parseFloat(value.item_total);
                                    }
                                    else
                                    {
                                        $scope.totDisc=parseFloat(value.item_total);
                                        $scope.statDisc=$scope.totDisc;
                                        if(value.item_ap>0)
                                        {
                                            $scope.ad_deduct='yes';
                                        }
                                        else
                                        {
                                            $scope.ad_deduct='no';
                                        }
                                        $scope.c_dis=parseFloat(value.item_total);
                                    }
                                    $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                                });
                                $scope.c_gt=parseFloat($scope.c_total)-parseFloat($scope.c_dis);
        //                        $log.log("XXXXXXXXXXX>>>>>>>>");
        //                        $log.log($scope.c_gt+"<X>"+$scope.c_total+"<X>"+$scope.c_dis);
                                $scope.c_dis=0;
                                $scope.updata=0;
                                $scope.cart_item_count= parseInt($scope.cTotal)-1;
        //                        if($scope.cart_main.cart)
                //                alert();
        //                        $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
                                if($scope.cart_item_count<1)
                                {
                                    $scope.cart_item_count=0;
                                }
                            }
                            else
                            {
                                angular.forEach($scope.cart_main.cart, function(value, key) 
                                {                            
                                    $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                                });
                                $scope.cart_item_count= parseInt($scope.cTotal)-1;
        //                        $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
                                if($scope.cart_item_count<1)
                                {
                                    $scope.cart_item_count=0;
                                }
                            }
                            $scope.dosha=dts.data['doshas'];
                            $scope.wallet=dts.data['wallet'];
                            $scope.uaddr=dts.data['addresses'];
                            $scope.horo=dts.data['spec_horo'];          
                            $scope.uGot=dts.data['gotras'];  
                            $scope.selAddrId=getCookie('addr_bill');
                                                 
                    }                    
                    $scope.noties=dts.data['noti'];
                        
                }
            });
        };
        
        $scope.initAllF=function(uid)
        {
//            alert(uid);
            $scope.url='../../scripts/qfinder_main_web';
            $scope.user=uid;  
            $scope.uid=uid;  
            $scope.getBdv1();
        };
        
        $scope.initLVP=function(uid)
        {
            $scope.redt_page='lvs';
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getBasehoro();
            $scope.getAllItems();    
            $scope.getCartUpdate(); 
            $scope.getLVS();
        }; 
        
        $scope.initAllConPage=function(uid)
        {
            $scope.sct();
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getBasehoro();
            $scope.getAllItems();    
            $scope.getCartUpdate(); 
        };
        
        $scope.indexCaller=function(uid)
        {
            $scope.viewData.fav=1;
            $scope.gaSend('index');
            $scope.sct();
            $scope.url1='scripts/qfinder_main_web_combined.php';
            $scope.user=uid;  
            $scope.uid=uid;  
//            $scope.bd=$scope.getBd();
            $scope.city=getCookie('city');
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
            $scope.params=[];
            $scope.params[0] = {"con":'get_ses_bd',"uid":uid}
            $scope.params[1] = 
            {              
                "con"   :   "getcities"
            }; 
            $scope.params[2] = {"con":'get_spe_hor',"uid":$scope.user};
            $scope.params[3] = {"con":'get_doshas'};
            $scope.params[4] ={"con"   :   "get_u_address","uid":uid}; 
            $http({
                method  :   'POST',
                url     :   $scope.url1,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                })
            .then(function(data){
                data=data.data;
                    $scope.bd=data.get_ses_bd;
                    $scope.allCities=data.getcities; 
                    $scope.horo=data.get_spe_hor;
                    $scope.dosha=data.get_doshas.item.dosha;  
                    $scope.uaddr=data.get_u_address;
                });    
            $scope.getCartUpdate();
        }
        
        $scope.initAllFotp=function(uid)
        {
            $scope.viewData.fav=0;
            $scope.gaSend('index');
            $scope.sct();
            $scope.url='scripts/qfinder_main_web';
            $scope.otptype='check';
            $scope.openWin('','signotp'); 
            $scope.getAllItems();     
//            $scope.getCartUpdate();          
        };
        
        $scope.initIndex=function(uid)
        {
            $scope.gaSend('index');
            $scope.viewData.fav=1;
            $scope.sct();
            $scope.addSlide();
//            $scope.getDet($uid);
            document.getElementById("xxxx2").style.display="none";
//            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.getLink=function(id)
        {
            if(id==308)
            {
                return "tele_services";
            }
            else
            {
                return "services";
            }
        }
        
        
        $scope.callRadChng=function(valx)
        {        
            $scope.sct();  
            $scope.fea_det[0]['fea_conT']=$scope.mDta.header_itms.tele_rates[valx].mins;
            $scope.fea_det[0]['fea_rtp']=parseFloat(parseFloat($scope.mDta.header_itms.tele_rates[valx].vals)*parseFloat($scope.fea_det[0]['tax'])/100)+parseFloat($scope.mDta.header_itms.tele_rates[valx].vals);
        }
        
        vm.eventClicked = function(event) {
            alert.show('Clicked', event);
        };

        
        
        $scope.lat = undefined;
        $scope.lng = undefined;

        $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
            var location = $scope.autocomplete.getPlace().geometry.location;
            $scope.lat = location.lat();
            $scope.lng = location.lng();
            $scope.$apply();
        });
        
        
        $scope.saveA2cDet=function(frmnax){
            $scope.frmna=frmnax;
            $scope.con_val={};
            $scope.con_val=$scope.fea_det[0];
            $scope.subFea={};
            $scope.subFea.fea_time=$scope.fea_det[0]['fea_conT'];
            $scope.subFea.fea_rate=$scope.fea_det[0]['fea_rtp'];
            $scope.subFea.selGot=$scope.selGot;
            $scope.subFea.othDet=$scope.frmna;
            $scope.params = 
            {
                "con"   :   "saveA2cDet",
                "con_val"    :   $scope.con_val,
                "subFea"    : $scope.subFea
            };      
//            $log.log($scope.params);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function(data) {
                    window.location.href='https://www.myfuturemirror.com/cart';
            });
        };
        $scope.initCartShow=function()
        {
            $scope.sct();            
            $scope.gaSend('cart');
            $scope.viewData.fav=0;
            if($scope.user!='gen')
            {
                document.getElementById("xxxx2").style.display="none";
            }
            else
            {
                $scope.openWin('','login');
            }
            $scope.getCartUpdate();
        }
        
        $scope.initNumeroShow=function()
        {        
            $scope.sct();     
            $scope.gaSend('numerology');
            $scope.viewData.fav=1;
            $scope.getNumeroData();
            document.getElementById("xxxx2").style.display="none"; 
        }
        
        $scope.initVastuShow=function()
        {
            $scope.sct();
            $scope.gaSend('vastu');
            $scope.viewData.fav=1;
            document.getElementById("xxxx2").style.display="none"; 
            $scope.getVastuData();
        }
        
        
        $scope.initAstro=function(x1)
        {        
            $scope.sct();
            $scope.viewData.fav=1;
//            alert(x1);
            if(parseInt(x1)==0)
            {
                $scope.gaSend('astrology/'+$stateParams.param1+'/'+$stateParams.param2);
                p1=$stateParams.param1;
                p2=$stateParams.param2;
            }
            else
            {
                $scope.gaSend('astrology');
                p1='1';
            } 
//            $log.log($scope.mDta);
            if(p1=='')
            {
                document.getElementById("xxxx2").style.display="none";
            }
            else
            {
                document.getElementById("xxxx2").style.display="none";          
                if(parseInt(p1)>0)
                {
                    $scope.feature_ques=$scope.mDta.header_itms.astro_qu;
                    var counter=0;
                    angular.forEach($scope.mDta.header_itms.astro_qu, function(value, key)
                    {
                        if(value.fea_id==p1)
                        {
                            $scope.qfil1=counter;
                            $scope.cur_item=[];
                            $scope.cur_item[0]=value;
                            $scope.pview=$scope.cur_item[0].fea_id+'-'+0;
                            $scope.actPage=0;
                            $scope.pnPage=[];
                        }
                        counter=counter+1;
                    });
                }
            }
        }
        
        $scope.initPujaShow=function(x1)
        {        
            $scope.sct();
            $scope.viewData.fav=1;
//            $scope.gaSend('puja');
//            $log.log("Out");
//            $log.log(x1);
            if(parseInt(x1)==0)
            {
                $scope.gaSend('puja/'+$stateParams.param2+'/'+$stateParams.param1);
                p1=$stateParams.param1;
                p2=$stateParams.param2;
            }
            else
            {
                $scope.gaSend('puja/');
                p1='1';
            } 
//            $log.log($scope.mDta);
            document.getElementById("xxxx2").style.display="none";
            if(p1=='')
            {
//                $log.log("$scope.mDta");
                document.getElementById("xxxx2").style.display="none";
            }
            else
            {
                document.getElementById("xxxx2").style.display="none";                
//                $log.log(parseInt(p1));
//                 $log.log("parseInt(p1)");
                if(parseInt(p1)>0)
                {
                    $scope.feature_ques=$scope.mDta.header_itms.cats;
                    var counter=0;
                    angular.forEach($scope.mDta.header_itms.pujas.cats, function(value, key)
                    {
                        if(value.pc_id===p1)
                        {
                            $scope.qfil1=counter;
                            $scope.cur_item=[];
                            $scope.cur_item[0]=value;
                            $scope.pview=$scope.cur_item[0].pc_id+'-'+0;
                            $scope.actPage=0;
                            $scope.pnPage=[];
                        }
                        counter=counter+1;
                    });
                }
            }
        }
        
        
        $scope.initPujasShow=function()
        {        
            $scope.sct();
//            alert();
            $scope.fea_det={};
            p2=$stateParams.param1;
            p1=$stateParams.param2;
            $scope.showBook1x=false;
            document.getElementById("xxxx2").style.display="none";
            $scope.sel=[];
            if(p1=='')
            {
                document.getElementById("xxxx2").style.display="none";
                alert("Some Error Occured. Please refresh this page");
            }
            else 
            {
                var counter=0;
//                if(angular.isDefined($scope.cur_item)) 
//                {
//                
//                $log.log(parseInt(p1));
//                $log.log('parseInt(p1)');
//                    if(parseInt(p1)>0)
//                    {
////                        $scope.feature_ques=$scope.mDta.header_itms.astro_qu;
//                        var counter=0;
//                        angular.forEach($scope.mDta.pujas.cats, function(valuex, keyx)
//                        {
//                            if(counter==0)
//                            {
//                                angular.forEach(valuex.pujas, function(value, key)
//                                {                                
//                                    if(value.puja_id==p1)
//                                    {
//                                        $scope.fea_det=[];
//                                        $scope.fea_det[0]=value;
//    //                                    if(angular.isDefined(fea_det[0].puja_pack[0].or[0]))
//    //                                    {
//    //                                        $scope.orpuja=fea_det[0].puja_pack[0].or[0];
//    //                                    }
//                                        $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
//                                        $scope.pujatotal=$scope.getValuefl($scope.fea_det[0].puja_pack[0].package_price);
//                                        angular.forEach($scope.fea_det[0].addons, function(value, key)
//                                        {
//                                            $scope.sel[value.item_name]='';
//                                        });
//                                        $scope.addPujaView($scope.fea_det[0].puja_id,$scope.user);
//                                        $scope.puja_type='basic';
//                                        counter=counter+1;
//                                    }
//                                });  
//                            }
//                        });
//                        document.getElementById("xxxx2").style.display="none";  
//                    }
//                    else
//                    {
//                        document.getElementById("xxxx2").style.display="none";
//                        alert("Some Error Occured. Please refresh this page");
//                    }
//                }
//                else
//                {
                var counter=0;
                angular.forEach($scope.mDta.header_itms.pujas.cats, function(value, key)
                {
                    if(counter==0)
                    {
                        angular.forEach(value.pujas, function(value1, key1)
                        {
                            if(counter==0)
                            {
                                if(value1.puja_id==p1)
                                {
                                    $scope.fea_det=[];
                                    $scope.fea_det[0]=value1;
//                                        if(angular.isDefined(fea_det[0].puja_pack[0].or[0]))
//                                        {
//                                            $scope.orpuja=fea_det[0].puja_pack[0].or[0];
//                                        }
                                    $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
                                    $scope.pujatotal=$scope.getValuefl($scope.fea_det[0].puja_pack[0].package_price);
                                    angular.forEach($scope.fea_det[0].addons, function(value, key)
                                    {
                                        $scope.sel[value.item_name]='';
                                    });
                                    $scope.gaSend('pujas/'+$scope.fea_det[0].puja_name+'/'+$scope.fea_det[0].puja_id);
                                    $scope.addPujaView($scope.fea_det[0].puja_id,$scope.user);
                                    $scope.puja_type='basic';
                                    counter=counter+1;
                                    document.getElementById("xxxx2").style.display="none";
                                }
                            }
                        });
                    }
                });
                                  
            }
                $log.log($scope.fea_det);
        };
        
        $scope.initPanchShow=function()
        {
            $scope.sct();
            $scope.viewData.fav=1;
            $scope.gaSend('panchang');
//            alert();
//            $log.log($scope.mDta);
            $scope.panchCity=getCookie('city_name');
            var dtx1=new Date();
            $scope.city=getCookie('city');
            $scope.panchang={};
            $scope.getPanchang(dtx1.getFullYear()+'/'+(dtx1.getMonth()+1)+'/'+dtx1.getDate());
//            $scope.panchang=$scope.mDta.panchang;
//            $scope.frmDta={};
//            $scope.frmDta.city=getCookie('city_name');
            document.getElementById("xxxx2").style.display="none";
        }
        
        
        $scope.initInvoShow=function()
        {
            $scope.sct();
            $log.log('Started');
            $scope.viewData.fav=0;
            $scope.gaSend('invoices');
            $scope.invoices=[];
            $scope.getInvCom('',0);
            $log.log('Started');
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.callEveDet = function(xevx,typ) 
        {          
            $log.log(xevx);
           if(typ==1)
           {
               $scope.desc_fes=xevx.idx;
           }
           else
           {
               $scope.desc_fes=xevx;
           }
           $scope.openWin('','fes_show');
        };
    
        $scope.initFestShow=function()
        {         
            $scope.sct();   
            $scope.gaSend('festivals');
            $scope.viewData.fav=1;
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.fest=[];
            $scope.ySet=1950;
            $scope.url='scripts/qfinder_main_web';
            $scope.itm_fest=0;
            $scope.eve={};
            $scope.eve.events=[];
//            $scope.getFestAll('','');
//            $scope.getFestAllNew();
            $scope.fest_dta=JSON.parse(atob(document.getElementById('festx').innerHTML));
            $log.log($scope.fest_dta);
            $log.log('$scope.fest_dta');
            $scope.tempIdx=[];
            $scope.tempIdx.ids=[];
            angular.forEach($scope.fest_dta, function(value, key)
            {
                $scope.tempIdx.cntr=0;
                if(value.length>0)
                {
//                    $log.log('value.length>0');
                    angular.forEach(value, function(value2, key2)
                    {                        
                        angular.forEach($scope.tempIdx.ids, function(xval, xkey)
                        {
                            if(xval==value2.fes_id)
                            {
                                $scope.tempIdx.cntr=1;
                            }
                        })
                        if($scope.tempIdx.cntr==0)
                        {
                            $scope.eve.events.push({title: value2.fes_name,
                                startsAt: moment.utc(value2.fes_starting).subtract(5, 'hours').subtract(30, 'minutes').toDate(),
                                endsAt: moment.utc(value2.fes_ending).toDate(),
                                color: { 
                                  primary: '#e3bc08',
                                  secondary: '#fdf1ba'
                                },
                                cssClass: 'a-css-class-name',
                                idx: value2
                            });
                            $scope.tempIdx.ids.push(value2.fes_id);
                            
                        }
                        else
                        {
//                            $scope.eve.events.filter(function (px) {
//                                $log.log("into events map");
//                                if (px.idx == value2.fes_id) {
//                                    $log.log("into events map if");
//                                } else {
//                                    $log.log("into events map else");
//                                    $scope.eve.events.push({title: value2.fes_name,
//                                        startsAt: moment.utc(value2.fes_starting).subtract(5, 'hours').subtract(30, 'minutes').toDate(),
//                                        endsAt: moment.utc(value2.fes_ending).toDate(),
//                                        color: { 
//                                          primary: '#e3bc08',
//                                          secondary: '#fdf1ba'
//                                        },
//                                        cssClass: 'a-css-class-name',
//                                        idx: value2.fes_id
//                                    });
//                                }
//                            });
                        }
                    });
                }
            });
            $log.log($scope.eve.events);
            document.getElementById("xxxx2").style.display="none"; 
        }
        
        $scope.initLiveShow=function()
        {           
            $scope.sct();
            $scope.gaSend('live');
            $scope.viewData.fav=1;
            $scope.getLVS();
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initConShow=function()
        {        
            $scope.sct();
            $scope.gaSend('contact');
            $scope.viewData.fav=0;
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initVidShow=function()
        {    
            $scope.sct();
            $scope.gaSend('video');
            $scope.viewData.fav=1;
            $scope.getBlogList('video');
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initIndVidShow=function()
        {          
            $scope.sct();
            $scope.gaSend('video/'+$stateParams.param1);
            $scope.viewData.fav=1;
            $scope.getBlogS($stateParams.param1,'vid');
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initBlogShow=function()
        {         
            $scope.sct(); 
            $scope.gaSend('blog');
            $scope.viewData.fav=1;
            $scope.getBlogList('post');
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initIndBlogShow=function()
        {         
            $scope.sct();
            $scope.gaSend('blog/'+$stateParams.param1);
            $scope.viewData.fav=1;
            $scope.getBlogS($stateParams.param1,'post');
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initAccShow=function()
        {         
            $scope.sct();
            $scope.all={};
            $scope.gaSend('account');
            $scope.viewData.fav=0;
            $scope.getAllBd($scope.user);
            $scope.showxitem=0;
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initRptshow=function()
        {         
            $scope.sct();
            $scope.gaSend('reports');   
            $scope.viewData.fav=0;
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.reports=[];
            $scope.getReportsCom();
            document.getElementById("xxxx2").style.display="none";
        }
        
        
        $scope.initPurShow=function()
        {         
            $scope.sct();
            $scope.gaSend('invoices');  
            $scope.viewData.fav=0;
             $scope.servs=[];
            $scope.ySet=1950;
            $scope.servs.pending=[];
            $scope.servs.requested=[];
            $scope.servs.expired=[];
            $scope.servs.used=[];   
            $scope.pujaele=[];
            $scope.serv_type='Pending Services';
            $scope.getPurServ('all');
            $scope.getPurPuja('all');
            document.getElementById("xxxx2").style.display="none";
        }
        
        $scope.initCBDShow=function()
        {         
            $scope.sct();
            $scope.gaSend('create_bd');    
            $scope.viewData.fav=0;
            document.getElementById("xxxx2").style.display="none";
            
        }
        
        
        
        $scope.initAServShow=function()
        {        
            $scope.sct();
//            $scope.gaSend('services/'+$stateParams.param0+'/');
            p1=$stateParams.param1;
            $scope.viewData.fav=1;
            p2=$stateParams.param2;
            $log.log($scope.mDta);
            if(p1=='')
            {
                document.getElementById("xxxx2").style.display="none";
                alert("Some Error Occured. Please refresh this page");
            }
            else 
            {
                var counter=0;
                if(angular.isDefined($scope.cur_item)) 
                {
                
//                $log.log(parseInt(p1));
                    if(parseInt(p1)>0)
                    {
                        $scope.feature_ques=$scope.mDta.header_itms.astro_qu;
                        var counter=0;
                        angular.forEach($scope.cur_item[0].sub_fea, function(value, key)
                        {
                            if(counter==0)
                            {
                                if(value.fea_id==p1)
                                {
                                    $scope.fea_det=[];
                                    $scope.fea_det[0]=value;
                                    counter=counter+1;
                                }
                            }
                        });
                        document.getElementById("xxxx2").style.display="none";  
                    }
                    else
                    {
                        document.getElementById("xxxx2").style.display="none";
                        alert("Some Error Occured. Please refresh this page");
                    }
                }
                else
                {
                    var counter=0;
                    angular.forEach($scope.mDta.header_itms.astro_qu, function(value, key)
                    {
                        if(counter==0)
                        {
                            angular.forEach(value.sub_fea, function(value1, key1)
                            {
                                if(counter==0)
                                {
                                    if(value1.fea_id==p1)
                                    {
                                        $scope.fea_det=[];
                                        $scope.fea_det[0]=value1;
                                        $scope.gaSend('services/'+$stateParams.param1+'/'+$stateParams.param0);
                                        $scope.gaSend('services/'+$scope.fea_det[0].fea_name+'/'+$scope.fea_det[0].fea_id);
                                        counter=counter+1;
                                        document.getElementById("xxxx2").style.display="none";
                                    }
                                }
                            });
                        }
                    });
                }
                                  
            }
        }
        
        $scope.initTeleServShow=function()
        {        
            $scope.sct();
            $scope.gaSend('tele_services/'+$stateParams.param1+'/'+$stateParams.param1);
            $scope.viewData.fav=1;
            p1=$stateParams.param1;
            p2=$stateParams.param2;
            $log.log($scope.mDta);
            $scope.radSel=0;
            if(p1=='')
            {
                document.getElementById("xxxx2").style.display="none";
                alert("Some Error Occured. Please refresh this page");
            }
            else 
            {
                var counter=0;
                if(angular.isDefined($scope.cur_item)) 
                {
                
//                $log.log(parseInt(p1));
                    if(parseInt(p1)>0)
                    {
                        $scope.feature_ques=$scope.mDta.header_itms.astro_qu;
                        var counter=0;
                        angular.forEach($scope.cur_item[0].sub_fea, function(value, key)
                        {
                            if(counter==0)
                            {
                                if(value.fea_id==p1)
                                {
                                    $scope.fea_det=[];
                                    $scope.fea_det[0]=value;
                                    counter=counter+1;
                                }
                            }
                        });
                        document.getElementById("xxxx2").style.display="none";  
                    }
                    else
                    {
                        document.getElementById("xxxx2").style.display="none";
                        alert("Some Error Occured. Please refresh this page");
                    }
                }
                else
                {
                    var counter=0;
                    angular.forEach($scope.mDta.header_itms.astro_qu, function(value, key)
                    {
                        if(counter==0)
                        {
                            angular.forEach(value.sub_fea, function(value1, key1)
                            {
                                if(counter==0)
                                {
                                    if(value1.fea_id==p1)
                                    {
                                        $scope.fea_det=[];
                                        $scope.fea_det[0]=value1;
                                        counter=counter+1;
                                        document.getElementById("xxxx2").style.display="none";
                                    }
                                }
                            });
                        }
                    });
                }
                                  
            }
        }
        
        $scope.initExServShow=function()
        {   
            $scope.sct();
//            $scope.gaSend('ex_services/'+$stateParams.param1);
$scope.viewData.fav=1;
            p1=$stateParams.param1;
            p2=$stateParams.param2;
//            $log.log(p1);
            if(p1=='')
            {
                document.getElementById("xxxx2").style.display="none";
                alert("Some Error Occured. Please refresh this page");
            }
            else 
            {
                var counter=0;
                angular.forEach($scope.mDta.header_itms.astro_exclusive, function(value, key)
                {
                    if(counter==0)
                    {
                        if(value.fea_id==p1)
                        {
                            $scope.fea_det=[];
                            $scope.fea_det[0]=value;
                            counter=counter+1;
                            $scope.gaSend('exclusive_services/'+$stateParams.param1+'/'+$stateParams.param1);
                            document.getElementById("xxxx2").style.display="none";
                        }                            
                    }
                });     
            }
        }
        
        $scope.panchChng=function(val)
        {
            if(val==2)
            {
                $scope.viewData.panch=parseInt($scope.viewData.panch+1)%3;
            }
            else
            {
                if($scope.viewData.panch==0)
                {
                    $scope.viewData.panch=2;
                }
                else
                {
                    $scope.viewData.panch=parseInt($scope.viewData.panch-1)%3;
                }
            }
            $log.log($scope.viewData.panch);
        }
        
        $scope.gaSend=function(pg)
        {
            ga('set', 'page', '/'+$scope.dLvl+'/'+pg);
            ga('send', 'pageview');
        }
        
        $scope.initAboutShow=function()
        {
            $scope.sct();
            $scope.gaSend('about');
            $scope.viewData.fav=0;
            $scope.addSlide();
            document.getElementById("xxxx2").style.display="none";
        };
        
        $scope.noReq=function(uid)
        {
//            $scope.addSlide();
            document.getElementById("xxxx2").style.display="none";
//            document.getElementById("xxxx2").style.display="none";
        }
        $scope.preVal='';
        $scope.preItem={};
        $scope.nullArr={};
//        var out,xot={};
        
        $scope.curFestShow=function(val)
        {
            var mdt1=mdt2=ydt1=ydt2='';
            
//            $log.log(val);
            if(val && $scope.preVal!=val)
            {
                var out={};
                var dtarr = val.split(" ");
                var startDate = new Date(dtarr[1]+","+ (new Date(Date.parse(dtarr[0] +" 1, "+dtarr[1])).getMonth()+1)+",1") , 
                endDate   = new Date(dtarr[1]+","+ (new Date(Date.parse(dtarr[0] +" 1, "+dtarr[1])).getMonth()+2)+",1");

                angular.forEach($scope.eve.events, function(record){
                    xdate= new Date(record.startsAt);
                    if(xdate>startDate && xdate<endDate)
                    {
                        if(out[dtarr[0]+" "+xdate.getDate()+', '+dtarr[1]])
                        {
                            out[dtarr[0]+" "+xdate.getDate()+', '+dtarr[1]].push(record.idx);
                        }
                        else
                        {
                            out[dtarr[0]+" "+xdate.getDate()+', '+dtarr[1]]=[];
                            out[dtarr[0]+" "+xdate.getDate()+', '+dtarr[1]].push(record.idx);
                        }
                    }
                });
                $scope.preVal=val;
                $scope.preItem=out;
//                $log.log("if");
                return out;
            }
            else
            {
                var out={};
//                $log.log($scope.preItem);
//                $log.log("else");
                out=$scope.preItem;
                return out;
            }
            
            
        };
        $scope.initTermsShow=function()
        {
            $scope.sct();
            $scope.gaSend('terms');
            $scope.viewData.fav=0;
            document.getElementById("xxxx2").style.display="none";
        };
        
        $scope.initPriShow=function()
        {
            $scope.gaSend('privacy');
            $scope.viewData.fav=0;
            $scope.sct();
            document.getElementById("xxxx2").style.display="none";
        };
        
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            
            var slidesTesti = $scope.slidesTesti = [];
            $scope.temp.text={};
            $scope.temp.text.head="About Us";
            $scope.temp.text.body="My Future Mirror is a one stop solution for your Astrology and Puja needs and requirements. We take pride in bringing to the world our Indian Vedic Jewels. All your Astrology, Numerology, Vaastu and Puja needs are catered by us through our fully professional team of Pujaris, Astrologers, Numerologists and Vastu experts who provide you with the best quality service anywhere in the world through the online medium. We wish our users the very best in life and hope we can be a part in your journey.";
            slides.push({
                image: "https://www.myfuturemirror.com/images/services/personalized_prediction_2018.jpg",
                url:"#",
                text: $scope.temp.text,
                id: currIndex++
            });
            slides.push({
                image: "https://www.myfuturemirror.com/images/services/personalized_prediction_2018.jpg",
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                url:"services/personalized-horoscope-for-2018/302",
                id: currIndex++
            });
            slides.push({
                image: "https://www.myfuturemirror.com/images/featuredbanner_kundali.jpg",
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                url:"services/Kundali-Analysis/2",
                id: currIndex++
            });
            
            slidesTesti.push({
                image: "https://www.myfuturemirror.com/images/testimonials/testimonial_shashankdhar_mantri.jpg",
                con:"I have used the services provided by MFM for both online puja and astrology services. The experience of the online puja was excellent and provided a very unique and interesting opportunity to do the darshan sitting in Kolkata itself in a simple and seamless manner.",
                name: "Shashankdhar Mantri",
                id: currIndex++
            });
            slidesTesti.push({
                image: "https://www.myfuturemirror.com/images/testimonials/tetimonial_ankit_agarwal.jpg",
                con:"Great app for all your astrological. Genuine place to get your planetary pujas done at honest prices.Best part is that the Puja can be viewed online.",
                name: "Ankit Agarwal",
                id: currIndex++
            });
        };

        /*
//        $scope.randomize = function () {
//            var indexes = generateIndexesArray();
//            assignNewIndexesToSlides(indexes);
//        };
//
//
//        // Randomize logic below
//
//        function assignNewIndexesToSlides(indexes) {
//            for (var i = 0, l = slides.length; i < l; i++) {
//                slides[i].id = indexes.pop();
//            }
//        }
//
//        function generateIndexesArray() {
//            var indexes = [];
//            for (var i = 0; i < currIndex; ++i) {
//                indexes[i] = i;
//            }
//            return shuffle(indexes);
//        }
//
//
//        function shuffle(array) {
//            var tmp, current, top = array.length;
//
//            if (top) {
//                while (--top) {
//                    current = Math.floor(Math.random() * (top + 1));
//                    tmp = array[current];
//                    array[current] = array[top];
//                    array[top] = tmp;
//                }
//            }
//
//            return array;
//        }
        
        
        */
        
        
        $scope.getBlogS=function(itm,bt)
        {
//            alert($scope.url);
//            alert($scope.city);
            $http({
            method  : 'POST',
            url     : $scope.url,
            data    : {"con":'getBPurl',"mask":itm,"bt":bt},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                $scope.blgDta=data;
            });
        };
        
        
        $scope.insComm=function(cons)
        {
            var captchResponse = $('#g-recaptcha-response').val();
            if(captchResponse.length == 0 )
            {
              alert('Please check the captcha');  
            }
            else
            {
                $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'insComm',"cons":cons,'idx':$scope.blgDta.id},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then(function(data){
                    alert("Thank you. Your comment has been submitted.")
                    data=data.data;
                    $log.log(data);
                    $scope.blgDta.comms=data;
                });
            }
            
            
        };
        
        
        $scope.initAllFbd=function(uid)
        {
            $scope.url='scripts/qfinder_main_web';
            $scope.otptype='check';
//            $scope.openWin('','bd_update'); 
            $scope.getAllItems();       
//            $scope.getCartUpdate();        
        };
        $scope.initAllF2=function(uid)
        {
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getCartUpdate();
        };
        $scope.initAllF2x=function(uid,idx)
        {
            $scope.dLvl='../../';
            $scope.filePath='../../blank.php';
//            alert(idx);
            $scope.url='../../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();
        };
        $scope.initAllVastu=function(uid)
        {
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getCartUpdate();          
        }; 
        $scope.initAllVastu2=function(uid,idx)
        {
            $scope.url='scripts/qfinder_main_web';
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
//            $scope.getFeatures2('vastu_qu',idx);
            $scope.getgenhoro();
            $scope.getAllItems();    
            $scope.getCartUpdate();                       
        };         
        $scope.initAllNumero=function(uid)
        {
            $scope.svl1=1;
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getCartUpdate();
        };      
        $scope.initAllNumero2=function(uid,idx)
        {
            $scope.dLvl='../../';
            $scope.filePath='../../blank.php';
            $scope.url='../../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();                      
        }; 
        $scope.initAllPanch=function(uid)
        {
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getCartUpdate();                       
            $scope.getChaugadia('2');           
            $scope.getHora('2');           
            $scope.getPlanetary('2');
        }; 
        $scope.initAllAS=function(uid,fea_name,fea_id)
        {
            $scope.dLvl='../../';
            $scope.filePath= '../../blank';
            $scope.url='../../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();          
//            $scope.getgenhoro();            
        }; 
        $scope.initAllGV=function(uid,fea_name,fea_id)
        {
            $scope.dLvl='../../';
            $scope.filePath= '../../blank';
            $scope.url='../../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();          
//            $scope.getgenhoro();            
        }; 
        $scope.initAllPujas=function(uid,fea_name,fea_id)
        {
            $scope.addrsel={};
            $scope.puja_type='basic';
            $scope.dLvl='../../';
            $scope.filePath='../../blank.php';
            $scope.url='../../scripts/qfinder_main_web';
            $scope.user=uid;  
            $log.log($scope.user);
            $scope.bd=$scope.getBdv1();
            $scope.bd=$scope.getPujaInner(fea_name,fea_id);
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
//            $scope.addrsel={};
//            $scope.puja_type='basic';
//            $scope.dLvl='../../';
//            $scope.filePath='../../blank.php';
//            $scope.url='../../scripts/qfinder_main_web';
//            $scope.user=uid;  
//            $scope.bd=$scope.getBd();
//            $scope.city=getCookie('city');
//            $scope.getCities();
//            if($scope.city=='')
//            {
//                document.cookie = "city=" + '28.7041,77.1025' + ";";
//            }
//            $scope.city_name=getCookie('city_name');
//            if($scope.city_name=='')
//            {
//                document.cookie = "city_name=" + 'Delhi' + ";";
//            }
//            $scope.getPujaDet(fea_name,fea_id);
//            $scope.astro_ex=$scope.getFeaturesAny('astro_exclusive','0','ex');
            $scope.addPujaView(fea_id,uid);
//            $scope.getCities();
//            $scope.getTags('puja_pack_tab',fea_id,'true');
//            $scope.getAllItems();     
//            $scope.getCartUpdate();
//            $scope.getgenhoro();            
        };    
        $scope.initCart=function(uid)
        {
            $scope.addrsel={};
            $scope.cart_req=1;
            $scope.puja_type='basic';
            $scope.url='./scripts/qfinder_main_web';
            $scope.user=uid;  
            $scope.bd=$scope.getBdv1();
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getcartInnerv1();
        };   
        $scope.initCartTest=function(uid)
        {
            $scope.addrsel={};
            $scope.cart_req=1;
            $scope.puja_type='basic';
            $scope.url='./scripts/qfinder_main_web';
            $scope.user=uid;  
            $scope.bd=$scope.getBdv1();
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getcartInnerv1();
        };   
        $scope.initCartTest1=function(uid)
        {
            $scope.addrsel={};
            $scope.showCart=0;
            $scope.cart_req=1;
            $scope.puja_type='basic';
            $scope.url='./scripts/qfinder_main_web';
            $scope.user=uid;  
            $scope.bd=$scope.getBdv1Cart();
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getcartInnerv1();
            $scope.selAddrId=getCookie('addr_bill');   
            
            
        };   
        $scope.pageVarInit=function()
        {
            $scope.getAllItems();            
//            $scope.vm = {};
//            $scope.vm.pager = {};
//            $scope.vm.setPage = $scope.setPage;
        }
        $scope.initAllFpuja=function(uid)
        {
            $scope.url='scripts/qfinder_main_web';
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
            $scope.getCartUpdate();
//            $scope.addPujaView(fea_id,uid);
        }; 
        $scope.initAllFpuja2=function(uid,idx)
        {
            $scope.dLvl='../../';
            $scope.filePath='../../blank.php';
            $scope.url='../../scripts/qfinder_main_web';
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
            $scope.getFeaturesAny('astro_exclusive','0','ex');
//            $scope.addPujaView(fea_id,uid);
  
            $scope.getCartUpdate();
        };         
        $scope.initSPB=function(uid)/* for blog and post page (general blog) */
        {            
            $scope.posts=[];
            $scope.url='../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();          
            //            $scope.getgenhoro();            
        }; 
        $scope.initPR=function(uid)/* for blog and post page (general blog) */
        {            
            $scope.posts=[];
            $scope.url='../scripts/qfinder_main_web';
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
            $scope.getBlogList('pr');
            $scope.getAllItems();     
            $scope.getCartUpdate();          
            //            $scope.getgenhoro();            
        }; 
        $scope.initSPB=function(uid)/* for blog and post page (general blog) */
        {            
            $scope.posts=[];
            $scope.url='../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();          
            //            $scope.getgenhoro();            
        }; 
        $scope.initSPBv=function(uid)/* for blog and post page (general blog) */
        {           
//            alert();
            $scope.posts=[];
            $scope.url='../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();         
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
            $scope.url='scripts/qfinder_main_web';
            $scope.mainFunc(uid);
            $scope.getPurServ('all');
            $scope.getPurPuja('all');
            $scope.getAllItems();     
            $scope.getCartUpdate();  
            $scope.getAllBd();
        };       
        $scope.initReports=function(uid)
        {
            $scope.mainFunc(uid);
            $scope.report_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $scope.url='scripts/qfinder_main_web';
            $scope.reports=[];
            $scope.getReportsCom();
            $scope.show_load_more=false;
            $scope.getAllItems();      
            $scope.getCartUpdate();         
        };          
        $scope.initLogU=function(uid)
        {            
            $scope.showxitem=0;
            if(uid=='gen')
            {
                $scope.bd=$scope.getBd();
                $scope.openWin('','login');                
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
            $scope.getCartUpdate();        
        };  
        $scope.initOverv=function(uid)
        {            
            if(uid=='gen')
            {
                $scope.bd=$scope.getBd();
                $scope.openWin('','login');                
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
            $scope.getCartUpdate();                   
        };    
        $scope.initOverv2=function(uid,phr)
        {
            $scope.url='../scripts/qfinder_main_web';
            if(uid=='gen')
            {
                $scope.bd=$scope.getBd();
                $scope.openWin('','login');                
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
            $scope.getCartUpdate();          
        };  
        $scope.initInvoices=function(uid)
        {
            $scope.url='scripts/qfinder_main_web';
            $scope.mainFunc(uid);
            $scope.inv_id=[];
            $scope.cItm=[];
            $scope.pageVarInit();
            $scope.invoices=[];
            $scope.getInvCom('',0);
            $scope.getAllItems();            
        }; 
        $scope.initInvo=function(uid,ses)
        {
            $scope.url='../scripts/qfinder_main_web';
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
            $scope.getCartUpdate();         
        }; 
        $scope.initOfrs=function(uid)
        {
            $scope.dLvl='../../';
            $scope.pageOn='offers';
            $scope.addrsel={};
            $scope.puja_type='basic';
//            if(t2==1)
//            {
                $scope.url='../scripts/qfinder_main_web';
//            }
//            else
//            {
//                $scope.url='../../scripts/qfinder_main_web';
//            }
            $scope.user=uid;  
            $scope.bd=$scope.getBdv1();
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getOfrsv1();
        }
        $scope.initOfrs2=function(uid)
        {
            $scope.dLvl='../../';
            $scope.pageOn='offers';
            $scope.addrsel={};
            $scope.puja_type='basic';
//            if(t2==1)
//            {
                $scope.url='../../scripts/qfinder_main_web';
//            }
//            else
//            {
//                $scope.url='../../scripts/qfinder_main_web';
//            }
            $scope.user=uid;  
            $scope.bd=$scope.getBdv1();
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getOfrsv1();
        }
        $scope.initKarma=function(uid,fbu)
        {
            $scope.fbp=[];
            $scope.showDiv=0;
            $scope.awrd=[];
            $scope.awrd.val=[];
            $scope.awrd.name=[];
            $scope.dLvl='../';
            $scope.pageOn='karma';
            $scope.url='../scripts/qfinder_main_web';
            $scope.user=uid;  
            var now = new Date();
            $scope.lb_week = now.getWeek();
            $scope.bd=$scope.getBdv1();
            $scope.city=getCookie('city');
            if($scope.city=='')
            {
                document.cookie = "city=" + '28.7041,77.1025' + ";";
            }
            $scope.city_name=getCookie('city_name');
            if($scope.city_name=='')
            {
                document.cookie = "city_name=" + 'Delhi' + ";";
            }
            $scope.getUserFB(uid,fbu);
            $scope.getFbVpUser();
            $scope.getKcat();
            $scope.getLeaderBoard($scope.lb_week);
            $scope.getLeaderBoardatb();
        }
        $scope.getUserDet=function(uid)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_user_det',"uid":uid},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $log.log('itmsx');
                $log.log(data);
                $scope.udet= data[0];                
            });
        }        
        $scope.getUserFB=function(uid,fbu)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_user_fb',"uid":uid,"fb":fbu},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
//                alert('called');
                $log.log('itmsfbu>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                $log.log(data);
                if(data.type=='update')
                {
                    alert('update');
                    $scope.openWin('','up_fb');
                }
                else if(data.type=='false')
                {
                    alert('false');
                    $scope.openWin('','up_fb');
                }
                else
                {
//                    alert('assigned');
                    $scope.fbu= data.id;                
                }
            });
        }
        $scope.remBtn=function(itemx1)
        {
            $log.log("item View>>>");
            $log.log(itemx1);
            if(itemx1.item_type=='item')
            {
                if(itemx1.item_id=='308')
                {
                    $log.log("??true");
                    return true;
                }
                else
                {
                    
                    $log.log("else??false");
                    return false;
                }
            }
            else
            {
                
                    $log.log("not item??false");
                return false;
            }
        };
        $scope.getFbVpUser=function(uid,fbu)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_fb_vp_user'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
//                alert();
                $log.log('>>>>>>>>>>>>>>>>>>>data vp>>>>>>');
                $log.log(data);
                $scope.vp=data['u_pend'];
                $scope.ouvp=data['all_pend'];
                $scope.aprvvp=data['u_aprv'];
            });
        }
        $scope.getValuefl=function(price)
        {
            return parseFloat(parseInt(price)+$scope.Math.ceil(price*18/100));
        }        
        $scope.getValueflD=function(price,price2)
        {
            return parseFloat(parseInt(price)-parseInt(price2)+$scope.Math.ceil((parseInt(price)-parseInt(price2))*18/100));
        }
        $scope.getValueflD2=function(price,price2)
        {
            return parseFloat(parseInt(price)-parseInt(price2)+$scope.Math.ceil((parseInt(price)-parseInt(price2))*18/100));
        }
        $scope.aprvPost=function(itm)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'aprv_fbpost',"item":itm},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.ouvp=data['all_pend'];
            });
        }
        $scope.getLeaderBoard=function(week)
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'leaderboard',"week":$scope.lb_week},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                $scope.leaderb=data;
            });
        }
        $scope.getLeaderBoardatb=function()
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'leaderboard_atb'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                $scope.atb=data;
            });
        }
        $scope.getKcat=function()
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_karma_cat'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.kcat=data;
            });
        }
        $scope.getawrdVal=function(id)
        {
            angular.forEach($scope.kcat, function(value, key)
            {
                if($scope.fbp.cat[id]==value.kc_id)
                {
                    $scope.awrd.val[id]=value.val;
                    $scope.awrd.name[id]=value.name;
                }
            });
        }
        $scope.frmCatUpdate=function(id)
        {
            alert();
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'update_karma_cat',"id":id,"cat":$scope.fbp.cat[id],"name":$scope.awrd.name[id]},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.vp=data;
            });
        }
        $scope.ifrmVid=function(url) 
        {
            return($sce.trustAsResourceUrl(url));
        }
        $scope.createBD=function(xbdup)
        {
            $scope.bdup=xbdup;
            if(!angular.isDefined($scope.bdup.date))
            {
                alert('Please Select Birth Date');
                return;
            } 
            if(!angular.isDefined($scope.bdup.month))
            {
                alert('Please Select Birth Month');
                return;
            } 
            if(!angular.isDefined($scope.bdup.year))
            {
                alert('Please Select Birth Year');
                return;
            }    
            $scope.params={"con":'addBD',"det":$scope.bdup};
            $log.log($scope.params);
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : $scope.params,
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                if(data==1)
                {
                    if(angular.isDefined($scope.bdup.retx1))
                    {
                        $location.path($scope.dLvl).replace().reload(false);
                        window.location.href='https://www.myfuturemirror.com'+$scope.bdup.retx1;
                    }
                    else
                    {
                        $location.path($scope.dLvl).replace().reload(false);
//                      window.location.href='https://www.myfuturemirror.com/';
                    }
                }
            });            
        };
        $scope.createBD2=function(xbdup)
        {
            $scope.bdup=xbdup;
            if(!angular.isDefined($scope.bdup.date))
            {
                alert('Please Select Birth Date');
                return;
            } 
            if(!angular.isDefined($scope.bdup.month))
            {
                alert('Please Select Birth Month');
                return;
            } 
            if(!angular.isDefined($scope.bdup.year))
            {
                alert('Please Select Birth Year');
                return;
            } 
                $scope.params={"con":'addBD',"det":$scope.bdup};
                $log.log($scope.params);
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : $scope.params,
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .then(function(data){
                    data=data.data;
                    $log.log(data);
                    if(data==1)
                    {
                        $scope.show_create=0;
                    }
                });
            
        };
        $scope.upBD2=function(xbdup)
        {
            $scope.bdupl=xbdup;
            $scope.params={"con":'updateBD',"det":$scope.bdupl};
            $log.log($scope.params);
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : $scope.params,
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                if(data==1)
                {            
                    if(document.getElementById('xxxx2'))
                    {
                        document.getElementById('xxxx2').style.display='block';
                    }
//                    document.
                    $scope.getAllBd($scope.user);
//                    $scope.show_create=0;
                }
            });
        };
        
        $scope.sct=function()
        {
            $scope.isNavCollapsed=true;
            $scope.isNavCollapsed2=true;
            $scope.isNavCollapsedfa=true;
            $scope.isNavCollapsedfq=true;
            $window.scrollTo(0, 0);
        };
        
        $scope.getBd=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_ses_bd',"uid":$scope.user},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function onSuccess(data) 
            {
                $scope.bd=data.data;
                $log.log('data set>>>');
                if($scope.user!='gen')
                {
                    if(data.status=="verify")
                    {
//                        window.location.href='https://www.myfuturemirror.com/checkotp';
                    }
                    else
                    {
                        if(!angular.isDefined($scope.bd.bd_id))
                        {
//                            window.location.href='https://www.myfuturemirror.com/create_birth_details';
                        }
                    }
                    $scope.proPic=getCookie('pro_pic');
                    $scope.user_name=$scope.bd.user_name;  
//                    $scope.getCartUpdate();
                    $scope.getNotifi();
                    $scope.hasChanged=1;
                    $scope.dashacalled=0;
                    $scope.horocalled=0;
                    $scope.getDoshas();
    //                $log.log('error');
                    $scope.favs();
//                    $scope.getWallet();
                    $scope.getUAddress($scope.user);
                    $scope.getWallet();
                }   
                else
                {
                    $scope.dashacalled=0;
                    $scope.horocalled=0;
                    $scope.hasChanged=0;
                }
//                $log.log(data);
                $scope.getgenhoro();
                
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
            .then(function(data1) 
            {
                var data=data1.data;
                $scope.bd=data;
                $scope.user_name=data1.user_name; 
                $scope.getgenhoro();                
            });            
        };
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
                }).then(function(data){
                    data=data.data;
                    $scope.AllItemsHdr=data;   
//                    $log.log('---------------------');
//                    $log.log(data);
//                    $log.log('---------------------');
            });
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
                }).then(function(data){
                    data=data.data;
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
                }).then(function(data){
                    data=data.data;
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
            $scope.url='scripts/qfinder_main_web';
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
                }).then(function(data){
                    data=data.data;
//                    data=json
//                    $log.log(data.length);
                    $log.log(data.ashtakoota);
                    if(angular.isDefined(data.ashtakoota))
                    {
//                        alert('x');
                        $scope.matrep.ret=true;
                        $scope.matrep.rec=data;
                    }
                    else
                    {
//                        alert('y');
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
                }).then(function(data){
                    data=data.data;
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
                }).then(function(data){
                    data=data.data;
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
//            alert();
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
                }).then(function(data){
                    data=data.data;
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
            });
        };
        $scope.checkDoshas=function()
        {
//            $http({
//                method  : 'POST',
//                url     : $scope.url,
//                data    : {"con":'get_doshas',"uid":$scope.user},
//                headers : {'Content-Type':'application/x-www-form-urlencoded'}
//            })
//            .then(function(data){data=data.data;  
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
            $scope.url='scripts/qfinder_main_web';
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
            $scope.url='scripts/qfinder_main_web';
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
            .then(function(data){
                data=data.data;
                $scope.subsall=data;
                $log.log('subsall');
                $log.log(data);
            });
        };
        $scope.getInfo=function()
        {
            $http.get("php/check_default_bd").then(function(data){
                data=data.data;
                $scope.p_stat=data;
                if($scope.p_stat==0)
                { 
                    $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'act_user'},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                   })
                    .then(function(data){
                        data=data.data;
                        $scope.ap=data;
                    });
                    $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'def_pro'},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                   })
                    .then(function(data){
                        data=data.data;  
                        $scope.dp=data;
                    });
                    $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'all_profiles',"type":'user'},
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                   })
                    .then(function(data){
                        data=data.data;
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
            .then(function(data){
                data=data.data;
//                $log.log("fest data : ");
//                $log.log(data);
                $scope.fest_dta=data;
                
//                $scope.events = [];
//                $scope.eve.events = [
//                {
//                    title: 'An all day event',
//                    color: {primary: '#e3bc08', secondary: '#fdf1ba'},
//                    startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
//                    endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate()
//                }
//              ];
                angular.forEach(data, function(value, key)
                {
                    if(value.length>0)
                    {
                        angular.forEach(value, function(value2, key2)
                        {
                                $scope.eve.events.push({title: value2.fes_name,
                                startsAt: moment.utc(value2.fes_starting).subtract(5, 'hours').subtract(30, 'minutes').toDate(),
                                endsAt: moment.utc(value2.fes_ending).toDate(),
                                color: { 
                                  primary: '#e3bc08',
                                  secondary: '#fdf1ba'
                                },
                                cssClass: 'a-css-class-name'
                              });
                        });
                    }
//                    i=i+1;
                });
                
                $log.log("events data");
                $log.log($scope.eve.events);
//                if($scope.events.length>0)
//                {
                    $log.log('entered>>>>');
//                    $scope.eventSources2 = [];
//                        
//                }
            });
            
        };
        
        $scope.getFestAllNew=function()
        {   
            $scope.fest_dta=[];
            $scope.formData = {
                "con"     :   'getFestAllNew'                
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                $log.log(data);
                $log.log('data');
                $log.log(data);
                data=data.data;
//                $log.log("fest data : ");
//                $log.log(data);
                $scope.fest_dta=data;
                angular.forEach(data, function(value, key)
                {
                    if(value.length>0)
                    {
                        angular.forEach(value, function(value2, key2)
                        {
                                $scope.eve.events.push({title: value2.fes_name,
                                startsAt: moment.utc(value2.fes_starting).subtract(5, 'hours').subtract(30, 'minutes').toDate(),
                                endsAt: moment.utc(value2.fes_ending).toDate(),
                                color: { 
                                  primary: '#e3bc08',
                                  secondary: '#fdf1ba'
                                },
                                cssClass: 'a-css-class-name',
                                idx: value2.fes_id
                              });
                        });
                    }
                });
                
                $log.log("events data");
                $log.log($scope.eve.events);
                $log.log('entered>>>>');
            });
            
        };
        
        $scope.showEvnt=function(evntx)
        {
            alert('called');
            $log.log(evntx);
            
        }
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
            .then(function(data){                
                $log.log(data);
                data=data.data;
                $log.log('panchdata');
                $scope.panchang=data;
            });
        };
        $scope.getChaugadia=function(val)
        {
            $scope.getSelCity(val);
            if(angular.isDefined($scope.sel_city))
            {
                var strUser =val;
            }
            else
            {
                var strUser =getCookie('city_name')+','+getCookie('city');
            }
            strUser=decodeURIComponent(strUser);
            var arrs=strUser.split(",");
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            var dt=document.getElementById('dt_pan').value;
            $log.log('>>>>>>>>>>>'+dt);
            $log.log('>>>>>>>>>>>'+$scope.city);
            $http({
            method  : 'POST',
            url     : $scope.url,
            data    : {"con":'get_chau',"day":dt,"city":$scope.city},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                $scope.chaugadhiya=data.chaughadiya;
                $log.log($scope.chaugadhiya);
            });
        };
        $scope.cfi=0;
        $scope.getFesShow=function(var1,var2)
        {
            var d = new Date();
            var n = d.getMonth()+1;
            var dt=d.getDate();
            if(n==var1)
            {
                $log.log($scope.fes_itms);
                if(var2>=dt)
                {
                    if(!angular.isDefined($scope.fes_itms) || $scope.cfi==0)
                    {
//                        $log.log('o');
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
//                    $log.log('false');
                }
            }
            else
            {
                return true;
//                $log.log('true');
            }
//            if(dt==var2)
//            {
//                $log.log('true');
//            }
//            $log.log(var1+' '+var2+' '+n+' '+dt);
//            if($scope.fes_itms==NULL)
//            {
//                return 1;
//            }
//            else
//            {
//                return false;
//            }            
        }
        $scope.getPlanetary=function(val)
        {
            $scope.getSelCity(val);
            if(angular.isDefined($scope.sel_city))
            {
                var strUser =val;
            }
            else
            {
                var strUser =getCookie('city_name')+','+getCookie('city');
            }
            strUser=decodeURIComponent(strUser);
            var arrs=strUser.split(",");
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
            .then(function(data){
                data=data.data;
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
            .then(function(data){
                data=data.data;
                $scope.svl1=1;
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
            .then(function(data){
                data=data.data;
                $scope.vas_dta=data;
                $scope.svl1=1;
            });
        };  
        $scope.getHora=function(val)
        {
            $scope.getSelCity(val);
            if(angular.isDefined($scope.sel_city))
            {
                var strUser =val;
            }
            else
            {
                var strUser =getCookie('city_name')+','+getCookie('city');
            }
            strUser=decodeURIComponent(strUser);
            var arrs=strUser.split(",");
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
            .then(function(data){
                data=data.data;
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
            if($scope.sel_city)
            {
                var strUser =$scope.sel_city;
                var arrs=strUser.split(",")
            }
            else if($scope.frmna.city)
            {
                var strUser =$scope.frmna.city;
                var arrs=strUser.split(",")
            }
//            alert(document.getElementById('dt_pan').value);
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            $scope.getPanchang(document.getElementById('dt_pan').value);
            $scope.chaugadhiya=[];
            $scope.hora=[];
            $scope.planetary=[];
        }
        $scope.getSpecPanch=function(frmDta)
        {
//            alert(document.getElementById('dt_pan').value)
            $scope.sel_city=frmDta.city;
            if($scope.sel_city)
            {
                var strUser =$scope.sel_city;
                var arrs=strUser.split(",")
            }
            else if($scope.frmna.city)
            {
                var strUser =$scope.frmna.city;
                var arrs=strUser.split(",")
            }
//            alert(document.getElementById('dt_pan').value);
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            document.cookie = "city_name=" + arrs[0] + ";";
            $scope.panchCity=getCookie('city_name');
            $scope.getPanchang(document.getElementById('dt_pan').value);
            $scope.chaugadhiya=[];
            $scope.hora=[];
            $scope.planetary=[];
        }
        $scope.getSelCity=function(sel_city)
        {
            $scope.sel_city=$("#sel_city"+sel_city+" option:selected").val();
//            alert($scope.sel_city);
        }
        $scope.setCity=function(val)
        {
            $scope.getSelCity(val);
            var strUser =$scope.sel_city;
            var arrs=strUser.split(",");
            document.cookie = "city=" + arrs[1]+','+arrs[2] + ";";
            $scope.city=arrs[1]+','+arrs[2];
            $scope.city_name=arrs[0];
            $scope.defCity=arrs[0];
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
            document.cookie = "city_name=" + arrs[0] + ";expires=-3600;";
            document.cookie = "city_name=" + arrs[0] + ";";
            $scope.mDta.panchangCt= arrs[0];
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
            .then(function(data){
                data=data.data;
                $scope.showLoader=0;
                if(data.item_id == -1){
                    $scope.user.wrcred = "Incorrect Username/Password";
                    $scope.user.userid = "";
                    $scope.user.pass = "";
                }
                else{
                    $location.path($scope.dLvl+"dashboard").replace().reload(false);
//                    window.location.href="dashboard";
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
//            if(angular.isDefined($scope.hasChanged) && $scope.hasChanged==1 && $scope.horocalled==0)
//            {
                $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_spe_hor',"uid":$scope.user},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .then(function(data){
                    data=data.data;
                    $scope.horocalled=1;
                    $scope.horo=data;
                    $scope.spec_horo=$scope.horo;
//                    $log.log('error'+$scope.bd.bd_id);
//                    $log.log('Horoscope Data :');
//                    $log.log(data);
                });
//            }
        };        
        $scope.getBasehoro=function()
        {
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_spe_hor',"uid":'gen'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
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
            .then(function(data){
                data=data.data;
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
            .then(function(data){
                data=data.data;
//                $log.log(data);
//                $log.log('xxxxxxxxxxxxxxxxx');
                if(val=='pending')
                {
                    $scope.cItm=data;
                    $scope.pujaele.pending=data;
                }
                if(val=='accepted')
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
                $log.log($scope.pujaele);
                $log.log('>>>>>>>>>>>>>>>>>>>>LAst ....'+val);
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
            .then(function(data){
                data=data.data
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
                        .then(function(data1) 
                        {
                            if(document.getElementById('ser_load'))
                            {
                                document.getElementById('ser_load').innerHTML='No Service Found';
                            }
                            $log.log(data1);$log.log('test here');
                            $scope.feature_ques[j]['sub_fea']=data1.data;
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
            .then(function(data){
                data=data.data;
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
            .then(function(data){
                data=data.data;
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
                        .then(function(data1) 
                        {
                            $scope.feature_ques[j].pujas=data1.data[0].pujas;
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
            .then(function(data){
                data=data.data;
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
        $scope.setServex=function(index) /*modded*/
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
            if(angular.isDefined($scope.hasChanged) && $scope.hasChanged==1 && $scope.dashacalled==0)
            {
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : {"con":'get_doshas'},
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .then(function(data){
                    data=data.data;
                    $scope.dashacalled=1;
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
            }
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
            .then(function(data){
                data=data.data;
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
                .then(function(data){
                    data=data.data;
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
                .then(function(data){
                    data=data.data;
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
                .then(function(data){
                    data=data.data;
                    var tlc=$scope.getHyphenated(data.item.fea_name);
                    if( fea_name.toLowerCase()==tlc.toLowerCase())
                    {
//                        alert($scope.getHyphenated(data.item.fea_name));
                        $scope.fea_det=data.item;
                    }
                    if($scope.fea_det.length==0)
                    {
                        document.getElementById('notf').style.display='block';
                        document.getElementById('nfwait').style.display='none';
                    }
                });
            }
            else
            {
                $scope.feaType='gen';
                $scope.dataparam={"con":'fea_det_gen',"uid":$scope.user,"fea_name":fea_name,"fea_id":fea_id};
                $http({
                    method  : 'POST',
                    url     : $scope.url,
                    data    : $scope.dataparam,
                    headers : {'Content-Type':'application/x-www-form-urlencoded'}
                })
                .then(function(data){
                    data=data.data;
//                    $log.log($scope.dataparam);
                    var tlc=$scope.getHyphenated(data.item[0].fea_name);
                    if( fea_name.toLowerCase()==tlc.toLowerCase())
                    {
//                        alert($scope.getHyphenated(data.item.fea_name));
                        $scope.fea_det=data.item;
                    }
//                    $log.log('XXXXXXXXXXXXXX');
//                    $log.log(data);
                    if($scope.fea_det.length==0)
                    {
                        document.getElementById('notf').style.display='block';
                        document.getElementById('nfwait').style.display='none';
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
                    .then(function(data){
                        data=data.data;
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
                        .then(function(data){
                            data=data.data;
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
                .then(function(data){
                    data=data.data;
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
                    .then(function(data){
                        data=data.data;
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
                        .then(function(data){
                            data=data.data;
                            
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
                .then(function(data){
                    data=data.data;
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
            .then(function(data){
                data=data.data;
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
            .then(function(data){
                data=data.data;
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
        $scope.checkAll2=function(val)
        {
            $scope.frmreg=val;
            $scope.errorx.un=false;
            $scope.errorx.up=false;
            $scope.errorx.up2=false;
            $scope.errorx.em=false;
            $scope.errorx.con=false;
            $scope.valid=0;
//            alert($scope.valid);
            if($scope.frmreg.user_pass!='' && $scope.frmreg.user_pass!=null)
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
            if($scope.frmreg.user_em!='' && $scope.frmreg.user_em!=null)
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
            if($scope.frmreg.user_name=='' || $scope.frmreg.user_name==null)
            {
                $scope.errorx.un=true;
                $scope.valid=$scope.valid+1;
            }
            if($scope.frmreg.user_con=='' || $scope.frmreg.user_con==null)
            {
                $scope.errorx.con=true;
                $scope.valid=$scope.valid+1;
            }
            if($scope.valid==0)
            {
//                alert();
                    $scope.formData = {
                    "con"       :   'reg',
                    "user_em"   :   $scope.frmreg.user_em,
                    "user_pass" :   $scope.frmreg.user_pass,
                    "user_con"  :   $scope.frmreg.user_con,
                    "ref_no"    :   $scope.frmreg.ref_no,
                    "src"       :   $scope.frmreg.src,
                    "user_name" :   $scope.frmreg.user_name
                };
    //            $log.log($scope.formData);
                    $http({
                        method  :   'POST',
                        url     :   $scope.url,
                        data    :   $scope.formData,
                        headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                    })
                    .then(function(data){
                        data=data.data;
                    $log.log('ret data :')
                    $log.log(data);
                    if(data.error== "false")
                    {
                        $location.path($scope.dLvl+"checkotp").replace().reload(false);
//                        window.location.href='checkotp';
                    }
                    else 
                    {
                        if(angular.isDefined(data.text))
                        {
                            alert(data.text);
                        }
                        else
                        {
                            alert('Some Problem Occur; Please try after some time');
                        }
                    }
                
            });
            }
//            alert($scope.valid);
            $log.log($scope.frmreg.user_name);
            $log.log($scope.frmreg.user_em);
            $log.log($scope.frmreg.user_con);
            $log.log($scope.frmreg.user_pass);
            $log.log($scope.frmreg.user_pass2);
        };
        
        $scope.subForm=function()
        {
//            alert('here1');
            $scope.formData = {
                "con"       :   'reg',
                "user_em"   :   $scope.frmreg.user_em,
                "user_pass" :   $scope.frmreg.user_pass,
                "user_con"  :   $scope.frmreg.user_con,
                "ref_no"    :   $scope.frmreg.ref_no,
                "src"       :   $scope.frmreg.src,
                "user_name" :   $scope.frmreg.user_name
            };
//            $log.log($scope.formData);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
            	$log.log('ret data :')
                $log.log(data);
                if(data.error== "false")
                {
                    $location.path($scope.dLvl+"checkotp").replace().reload(false);
//                    window.location.href='checkotp';
                }
                else 
                {
                    if(angular.isDefined(data.note))
                    {
                        alert('You are already registared with this email / contact no. If you forgot password, click on forgot password.');
                    }
                    else
                    {
                        alert('Some Problem Occur; Please try after some time');
                    }
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
            .then(function(data){
                data=data.data;
                if(data.reg == 1)
                {
                    $scope.cem='on';
                }
            });
        }
        $scope.checkLog=function(val)
        {          
            if(!angular.isDefined($scope.redt_page))
            {
                $scope.redt_page='none';
            }
            $scope.xlog=val;
//            $log.log($scope.user_eml);
            $scope.log.errormsg="Please wait...Checking creadentials.";
            $scope.formData = {
                "con"       :   'check_log',
                "user_em"        :   $scope.xlog.user_eml,
                "user_pass"        :   $scope.xlog.user_passl
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                if(data.status=="verify")
                {
                    document.cookie = "pro_pic="+data.pro_pic+"; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pro_pic="+data.pro_pic;
                    $scope.log.errormsg="User verification pending...waiting for verification.";
                    $scope.tempuser=data.uid;
//                    $scope.openWin('','includes/windows/win_signotp.php');
                    $scope.openWin('','signotp');
                    $scope.favsDefault();
                    $scope.getUAddress(data.uid);
                    
                }
                else if(data.status=="verified")
                {
                    $scope.log.errormsg="User verified...Logging in.";
                    $log.log(data);
                    $log.log("Uesr data");
                    $scope.getDet(data.uid);
                    $scope.getLVS();
                }
                else
                {
                    $scope.log.errormsg="Wrong Credentials please check";
                }
                
            });
        };
        $scope.checkOTP=function(otptype,item)
        {            
            $scope.otp=item;
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
            .then(function(data){
                data=data.data;
                $log.log(data);
//                alert('came');
                if(data == '"verified"')
                {
                    if(otptype=='gen')
                    {
                        $scope.closeWin();
                    } 
                    else if(otptype=='check')
                    {
                        $location.path($scope.dLvl+"").replace().reload(false);
//                        window.location.href='';
                    }   
                    else
                    {
//                        $location.path($scope.dLvl+"").replace().reload(false);
                        $scope.getDet($scope.user);
                        $scope.closeWin();
//                        window.location.href='https://www.myfuturemirror.com';
                    }
                }
                else
                {
                }
            });
        }
        $scope.checkOTP2=function(otptype,vals)
        {            
            $scope.formData = {
                "con"       :   'check_otp',
                "otp"        :   vals.otp
            };
//            alert(otptype);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                if(data == '"verified"')
                {
                    if(otptype=='gen')
                    {
                        $scope.modalWin=false;
                    } 
                    else if(otptype=='check')
                    {
                        $location.path($scope.dLvl+"").replace().reload(false);
//                        window.location.href='index';
                    }                    
                }
                else
                {
                }
            });
        }
        $scope.checkEM2=function(val)
        {
            $log.log('Email :'+val);
//            $log.log('Email :'+document.getElementById());
            $scope.user_emfp=val;
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
            .then(function(data){
                data=data.data;
                $log.log(data);
                if(data == 1)
                {
                    $scope.openWin('','cpass')
                }
                else
                {
                    $scope.forpass.ret='Email/Number not registared';
                }
            });
        };
        $scope.requestOtp=function(em)
        {
            $scope.formData = {
                "con"           :   'req_otp',
                "user_em"       :   em
            };
//            alert(em);
            $http({
                method  :   'POST',
                url     :   'scripts/qfinder',
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                if(data == 1)
                {
                    
//                    $scope.redturl='reset_password?em='+btoa($scope.user_emfp);
////                    $log.log($scope.redturl);
//                    window.location.href=$scope.redturl;
                }
            });
        };
        $scope.checkReset=function(val)
        {          
            $scope.xlog=val;
            if($scope.xlog.user_pass!='' && $scope.xlog.user_pass2!='')
            {
                if($scope.xlog.user_pass==$scope.xlog.user_pass2)
                {
                    if($scope.xlog.otp!='')
                    {
                        $scope.formData = {
                            "con"       :   'otp_reset',
                            "otp"       :   $scope.xlog.otp,
                            "ps"        :   $scope.xlog.user_pass,
                            "em"        :   $scope.user_emfp
                        };
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.formData,
                            headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                        })
                        .then(function(data){
                            data=data.data;
                        $scope.message=[];
                        if(data.error == 'false')
                        {                            
                            alert('Your Password has been changed');
                            $scope.message.error='false';
                            $scope.message.tag='Loging in to dashboard';
                            $scope.openWin('','login');
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
        $scope.resendOTP=function()
        {                      
            $scope.formData = {
                "con"       :   'resend_otpx'
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                document.getElementById(res_otp).disabled='true';
                if(data==1)
                {
                    
                    setTimeout(function(){document.getElementById(res_otp).disabled='false'},5000);
                }
            });  
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
            .then(function(data){
                data=data.data;
                $scope.modalWin=true;
                $scope.openWin('','up_eml');
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
            .then(function(data){
                data=data.data;
                $scope.openWin('','up_phn');
            });
        }
        $scope.checkResetPhn=function(val)
        {                      
            $scope.con1=val.con1;                   
            $scope.con2=val.con2;                   
            $scope.otpPh=val.otpPh;
//            $scope.conph=[];
            $scope.conph.message=[];
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
                        .then(function(data){
                            data=data.data;
                            document.getElementById('btn_crp').disabled=false;
                            if(data.error=='false')
                            {
                                alert(data.msg);
                            }
                            else
                            {
                                alert(data.msg);
                                $scope.closeWin();
                            }
                            document.getElementById('btn_cph').disabled=false;
                        });                    
                    }
                    else
                    {
                        $scope.conph.message.error='true';
                        $scope.conph.message.tag='Please provide the OTP sent to your registered number';
                    }
                }                
                else
                {
                    $scope.conph.message.error='true';
                    $scope.conph.message.tag='Both New Contact Number have to be same';
                }
            }
            else
            {
                $scope.conph.message.error='true';
                $scope.conph.message.tag='New Contact Number and Confirm New Contact Number are mandatory';
            }             
        };
        $scope.checkResetEm=function(val)
        {          
            $scope.eml1=val.eml1;                   
            $scope.eml2=val.eml2;                   
            $scope.otpem=val.otpem;
//            $scope.conph=[];
            $scope.emch.message=[];
            if($scope.eml1!='' && $scope.eml2!='')
            {
                if($scope.eml1==$scope.eml2)
                {
                    if($scope.otpem!='')
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
                        .then(function(data){
                            data=data.data;
                            document.getElementById('btn_cem').disabled=false;
                            if(data.error=='false')
                            {
                                alert(data.msg);
                            }
                            else
                            {
                                alert(data.msg);
                                $scope.closeWin();
                            }
                            document.getElementById('btn_cem').disabled=false;
                        });                    
                    }
                    else
                    {
                        $scope.emch.message.error='true';
                        $scope.emch.message.tag='Please provide the OTP sent to your registered number';
                    }
                }                
                else
                {
                    $scope.emch.message.error='true';
                    $scope.emch.message.tag='Both New Contact Number have to be same';
                }
            }
            else
            {
                $scope.emch.message.error='true';
                $scope.emch.message.tag='New Contact Number and Confirm New Contact Number are mandatory';
            }             
        };        
        $scope.getLVS=function()
        {   
            $scope.formData = {
                "con"   :   'getLVSall'
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                $log.log('data received');
                $scope.dataLVS=data;
                $log.log($scope.dataLVS);
            });
//            if($scope.uid!='gen')
//            {
//                $log.log('data called');
//                $scope.formData = {
//                    "con"   :   'getLVS'
//                };
//                $http({
//                    method  :   'POST',
//                    url     :   $scope.url,
//                    data    :   $scope.formData,
//                    headers :   {'Content-Type': 'application/x-www-form-urlencode'}
//                })
//                .then(function(data){data=data.data; 
//                    $log.log('data received');
//                    $log.log(data);
//                    $scope.dataLVS=data;
//                });
//            }
        }
        
        
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
            .then(function(data){
                data=data.data;
//                $log.log(data);
                if(data.error== "false")
                {
                   $scope.openWin('','signotp');
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
                }).then(function(data){
                    data=data.data;
//                    $log.log(data);
//                     $log.log('>>>>');
                    $scope.uaddr=data;
            });
        }
        $scope.setUAddress=function(frmna)
        {
            $scope.frmna=frmna;
//            alert($scope.frmna.addr);
//            alert();
            if($scope.frmna.othr=='other')
            {
                $scope.frmna.city=$scope.frmna.city2;
            }
            if($scope.frmna.addr!='' || $scope.frmna.addr!=' ')
            {
                if($scope.frmna.city!='' || $scope.frmna.city!=' ')
                {
                    if($scope.frmna.pin!='' || $scope.frmna.pin!=' ')
                    {
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
                        $log.log($scope.params);
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.params,
                            headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                            }).then(function(data){
                                data=data.data;
            //                    $log.log('xxxxxxxxxxxxxxx');
            //                    $log.log(data);
                                $scope.uaddr=data;
                        });
                    }
                    else
                    {
                        alert('Please Enter Pin');
                    }
                }
                else
                {
                    alert('Please Enter City');
                }
            }
            else
            {
                alert('Please Enter Address');
            }
        }
        $scope.getUGotras=function(uid)
        {
            $scope.params = 
            {
                "con"   :   "get_u_gotras",
                "uid"    :   $scope.user
            };      
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function(data){
                    data=data.data;
//                    $log.log(data);
//                     $log.log('>>>>');
                    $scope.uGot=data;
            });
        }
        $scope.saveGotra=function(jj)
        {
            $scope.frmna=jj;
//            alert($scope.frmna.addr);
//            alert();
            $scope.params = 
            {
                "con"   :   "set_u_gotra",
                "uid"    :   $scope.user,
                'dob'    :   $scope.frmna.dob,
                'place'      :   $scope.frmna.place,
                'name'      :   $scope.frmna.name,
                'gotra'    :  $scope.frmna.gotra,
                'ret'       :   'true'
            };      
            $log.log($scope.params);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function(data){
                    data=data.data;
//                    $log.log('xxxxxxxxxxxxxxx');
//                    $log.log(data);
                    $scope.uGot=data;
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
                }).then(function(data){
                    data=data.data;
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
            .then(function(data){
                data=data.data;
                $scope.closeWin();
                if($scope.otptype=='check')
                {
                    $location.path($scope.dLvl+"").replace().reload(false);
//                    window.location.href='index';
                }
                $scope.user='gen';  
                $scope.bd=$scope.getBd();
            });
        }        
        $scope.showHor=function()
        {
            $scope.openWin('','horoscope');
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
                .then(function(data){
                    data=data.data;
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
            .then(function(data){
                data=data.data;
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
        $scope.setDet=function(ind)
        {
            $scope.showBook1x='true';
            angular.forEach($scope.uGot, function(value, key) 
            {
                if(value.ug_id==ind)
                {
                    $scope.selGot=value;
                }
            });
        }
        $scope.ugotReset=function()
        {
            $scope.showBook1x='false';
        }
        $scope.setAddr2=function(addr)
        {
            $scope.printed=1;
            $scope.dellocx=addr;
            
//            window.location.href='https://www.myfuturemirror.com/cart';
            $scope.closeWin();
//            $location.path($scope.dLvl+"").replace().reload(false);
//            $scope.add2c('item',$scope.fea_det[0],0);
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
            .then(function(data){
                data=data.data;
                $scope.getCartUpdate();
                $scope.closeWin();
            });
        }
        $scope.setAddrBill=function(addr)
        {
            $scope.formData = {
                "con"       :   'setAddrBill',
                "addr"      :   addr
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                if(data.ret=="success")
                {
                    $location.path($scope.dLvl+"checkout").replace().reload(false);
//                    window.location.href="https://www.myfuturemirror.com/checkout";
//                    if((parseFloat($scope.c_gt)+Math.ceil(parseFloat($scope.c_gt)*18/100))>1)
//                    {
//                        window.location.href="https://www.myfuturemirror.com/checkout";
//                    }
//                    else
//                    {
////                        window.location.href="https://www.myfuturemirror.com/checkout_coup";
//                    }
                }
            });
        }
        $scope.setAddrBillx1=function(addr)
        {
            document.cookie = "addr_bill="+addr.udl_id+";";
            $scope.selAddrId=addr.udl_id;
            $log.log("sel addr "+addr);
            $scope.getDesign($scope.selAddrId);
        }
        $scope.showAddrEdt=function(idx)
        {
            $scope.upitm=idx;
            $scope.openWin('','edtLoc');
            
        }
        /*********** add items to cart ************/
        $scope.add2c=function(d1,d2,d3)
        {
            $scope.updata=1;
            if(d1!='coupon')
            {
                if(d1=='ap')
                {
//                    $log.log('set 1');
                    if($scope.ad_deduct=='no')
                    {
                        $scope.ad_deduct_sub='yes';
                    }
                    else
                    {
                        $scope.ad_deduct_sub='no';
                    }
                    $scope.params = {
                    "con"       :   "add2c_item",
                    "uid"       :   $scope.uid,
                    "type"      :   d1,
                    'item'      :   '',
                    'subfea'    :   $scope.ad_deduct_sub
                    };
                    $log.log($scope.params);
                    $http({
                        method  :   'POST',
                        url     :   $scope.url,
                        data    :   $scope.params,
                        headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function(data){
                        data=data.data;
                        $scope.updata=1;
                        $scope.getCartUpdate();
                    });
                }
                else if(d1=='puja')
                {
                    if(document.getElementById('puja_dt'))
                    {
//                        $log.log('x');
                        var x=document.getElementById('puja_dt').value; 
                        var dtx=x.replace(/[/]+/g,"-"); 
                        var dtx1=dtx.split('-');
                        var dt=dtx1[2]+'/'+dtx1[1]+'/'+dtx1[0];
//                        var dt=$scope.x22;
                    }
                    else
                    {
                        if($scope.fea_det[0]['puja_pack'][0]['group']==1)
                        {
                            $log.log(1);
                            var dt='group';
                        }
                        else
                        {
                            if($scope.fea_det[0]['puja_pack'][0]['fixed_date']!=null)
                            {
                                $log.log(2);
                                var dt=$scope.fea_det[0]['puja_pack'][0]['fixed_date'];
                            }
                            else
                            {
                                $log.log(3);
//                                var dtx=$scope.dtpick.split('-');
                                var dt=$scope.x22;
                            }
                        }
                    }                    
                    d3=$scope.fea_det[0].puja_pack[0].pp_id;
                    $scope.params = {
                    "con"       :   "add2c_item",
                    "uid"       :   $scope.uid,
                    "type"      :   d1,
                    'item'      :   $scope.selAdnItm,
                    'subfea'    :   d3+','+dt+','+$scope.sel_city_puja+','+$scope.puja_type+','+$scope.pt_radio+','+$scope.uaddr[$scope.addrsel]['udl_id']+','+$scope.selGot.ug_id
                    };
                    $http({
                        method  :   'POST',
                        url     :   $scope.url,
                        data    :   $scope.params,
                        headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function(data){
                        data=data.data;
                        $scope.alerts('alertsuc','Product added to cart...');
                        $scope.closeWin();
                        $scope.updata=0;                        
                        $scope.getCartUpdate();
                        $location.path($scope.dLvl+"cart").replace().reload(false);
//                        window.location.href='https://myfuturemirror.com/cart';
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
                    }).then(function(data){
                        data=data.data;
                        $scope.alerts('alertsuc','Product added to cart...');
    //                    $log.log(data);
//                        window.location.href='https://www.myfuturemirror.com/cart';
                        $location.path($scope.dLvl+"cart").replace().reload(false);
                        $scope.getCartUpdate();
                        $scope.updata=0;
                    });
                }
            }
            else
            {       
                $scope.ad_deduct_sub='no';
                $log.log(document.getElementById('coupon2').value);
                $scope.params = {
                "con"       :   "add2c_item",
                "uid"       :   $scope.uid,
                "type"      :   d1,
                'item'      :   document.getElementById('coupon2').value
                };
                $log.log($scope.params);
                $http({
                    method  :   'POST',
                    url     :   $scope.url,
                    data    :   $scope.params,
                    headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function(data){
                    data=data.data;
                    $scope.alerts('alertsuc','Coupon applied...');
                    $scope.updata=0;
                    $scope.getCartUpdate();
                    document.getElementById('coupon2').value='';
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
            }).then(function(data){
                data=data.data;
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
            }).then(function(data){
                data=data.data;
                $scope.alerts('alertdanger','Item Deducted from cart...');
//                    $log.log(data);
                $scope.updata=0;                        
                $scope.getCartUpdate();
            });    
        };
        $scope.delfc12=function(d1,d2,d3)
        {
            $scope.updata=1;   
            
                $scope.params = {
                "con"       :   "dedfc_item",
                "uid"       :   $scope.uid,
                "type"      :   'tele',
                'item'      :   d2.tc_id,
                'ded_type'  :   d3
                };
            
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(data)
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
            }).then(function(data)
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
            if($scope.user!='gen')
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
                }).then(function(data){
                    data=data.data;
                    $scope.cart_main=data;
                    $scope.globalx.cartdisc=[];
//                    $log.log($scope.cart_main);
                    $scope.c_gt=0;
                    $scope.c_total=0;
                    $scope.c_cou='';
                    $scope.c_dis=0;
                    $scope.c_ap=0;
                    $scope.cTotal=0;
                    $scope.totDisc=0;
                    $scope.statDisc=0;
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
                            if(value.item_ap>0)
                            {
                                $scope.ad_deduct='yes';
                            }
                            $scope.c_dis=parseFloat(value.item_total);
                            $scope.totDisc=parseFloat(value.item_total);
                            $scope.statDisc=$scope.totDisc;
                        }
                        $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                       
                    });
                    $scope.c_gt=parseFloat($scope.c_total)-parseFloat($scope.c_dis);
                    $scope.c_dis=0;
                    $scope.updata=0;
//                    $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
    //                alert();
                    $scope.cart_item_count= parseInt($scope.cTotal)-1;
                    if($scope.cart_item_count<1)
                    {
                        $scope.cart_item_count=0;
                    }
                    if(isNaN($scope.cart_item_count))
                    {
                        $scope.cart_item_count=0;
                    }
                });
                
            }
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
                }).then(function(data){
                    data=data.data;
                    $log.log(data);
                    $scope.updata=0;
                    $scope.alerts('alertgreen',"Your purchase is complete.<a href='https://www.myfuturemirror.com/dev_area/astro_asso/main_site/user/orders'>Click here</a> to show details of your order.");
                    $scope.getCartUpdate();
                    $scope.closeWin();
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
                }).then(function(data){
                    data=data.data;
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
                $scope.itmz.price=parseFloat($scope.getValuefl($scope.fea_det[0].puja_pack[0].package_price));
                $scope.itemcart.push($scope.itmz);
                $scope.pujatotal=parseFloat($scope.getValuefl($scope.fea_det[0].puja_pack[0].package_price));
            }
            else if($scope.puja_type=='pre')
            {
                $scope.itmz.item='Premium Puja';
                $scope.itmz.itemOR='';
                $scope.itmz.itemt='puja';
                $scope.itmz.spec='';
                $scope.itmz.price=parseFloat($scope.getValuefl($scope.fea_det[0].puja_pack[0].premium_price));
                $scope.itemcart.push($scope.itmz);
                $scope.pujatotal=parseFloat($scope.getValuefl($scope.fea_det[0].puja_pack[0].premium_price));
            }
            $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
            angular.forEach($scope.fea_det[0].addons, function(value, key)
            {
//                $scope.sel[value.item_name]='';
//                var e=document.getElementById('sel'+value.item_name);
//                var x=e.options[e.selectedIndex].value;
                var x=$scope.sel[value.item_name];
                $scope.itmz=[];
//                $log.log(x);
                if(x!=="")
                {       
                    $scope.itmz.item=value.item_name;
                    $scope.itmz.itemOR='';
                    $scope.itmz.itemt='item';
                    $scope.itmz.spec=value.items[x].item_quantity;
                    $scope.itmz.price=parseFloat(value.items[x].price)+parseFloat(value.items[x].price)*parseFloat(value.items[x].tax_per)/100;
                    $scope.itemcart.push($scope.itmz);
                    
                    $scope.selAdnItm.push(value.items[x]);
//                    $log.log($scope.selAdnItm);
//                    $log.log('Value var: ');
//                    $log.log(value.items[x]);
                    $scope.pujatotal=parseFloat($scope.pujatotal)+parseFloat(value.items[x].price)+parseFloat(value.items[x].price)*parseFloat(value.items[x].tax_per)/100;
                    $scope.timeDure=parseFloat($scope.timeDure)+parseFloat(value.items[x].time);
                }
            });
        };
        $scope.swtPujaType=function(type)
        {
            $scope.puja_type=type;
            $scope.showPrice();
        }
        $scope.closeWin();
        
        $scope.checkPADt=function()
        {
            $scope.showBookbtn=false;
            var dt=document.getElementById('puja_dt').value;
            var selDt=moment(dt,'MM/DD/YYYY');
            var minDt=new Date();
            minDt.setDate(minDt.getDate() + 2);
            var dd = minDt.getDate();
            var mm = minDt.getMonth() + 1;
            var y = minDt.getFullYear();
            var dtpick=moment(dd+'/'+mm+'/'+y,'DD/MM/YYYY');
            if(selDt<dtpick)
            {
                alert("Please Change The Date.\nYou Cannot Book Puja For Before : "+dtpick.format('MMMM Do YYYY'));
                $scope.puavail.dtpick=dtpick.format('MM/DD/YYYY');
            }
        };
        
        $scope.pujaAvail=function(puavail)
        {
            $scope.sel_city_puja=puavail.sel_city_puja;
            $scope.pt_radio=puavail.pt_radio;
            var dt=document.getElementById('puja_dt').value;
            $scope.dtpick=puavail.dtpick;
            $scope.showPrice();
            if(dt=='')
            {
                alert('Please Select Date');
            }
            else 
            {
                var dt=document.getElementById('puja_dt').value;
                var selDt=moment(dt,'MM/DD/YYYY');
                var minDt=new Date();
                minDt.setDate(minDt.getDate() + 2);
                var dd = minDt.getDate();
                var mm = minDt.getMonth() + 1;
                var y = minDt.getFullYear();
                var dtpick=moment(dd+'/'+mm+'/'+y,'DD/MM/YYYY');
                if(selDt<dtpick)
                {
                    alert("Please Change The Date.\nYou Cannot Book Puja For Before : "+dtpick.format('MMMM Do YYYY'));
                    $scope.puavail.dtpick=dtpick.format('MM/DD/YYYY');
                }
                else
                {
                    if(!angular.isDefined($scope.pt_radio))
                    {
                        alert('Please Select Puja type : Online / Offline');
                    }
                    else
                    {
                        if($scope.sel_city_puja=='')
                        {
                            alert('please select city');
                        }
                        else
                        {
                                $scope.params = 
                                {              
                                    "con"   :   "getPujaAvail",
                                    "date"  :   dt,
                                    "city"  :   $scope.sel_city_puja,
                                    "puja"  :   $scope.fea_det[0]['puja_id']
                                };
                                $http({
                                method  :   'POST',
                                url     :   $scope.url,
                                data    :   $scope.params,
                                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
                                }).then(function(datax) 
                                {
                                    var data=datax.data;
                                    $log.log(data);
                                    $scope.x22=data.xx2;
                                    $log.log('>>>>>>>>>>>>>>>>>');
                                    if($scope.pt_radio=='off')
                                    {
                                        if(data.offline>0)
                                        {
                                            $scope.messageOn='Offline puja available';                                        
                                            $scope.showBookbtn=true;
                                            $scope.orPujaItmTemp();
                                        }
                                        else
                                        {
                                            $scope.messageOn='Offline puja not available';  
    //                                        $scope.puavail.pt_radio='on';
                                            $scope.showBookbtn=false;
                                        }
                                    }
                                    if($scope.pt_radio=='on')
                                    {
                                        if(data.online>0)
                                        {
                                            $scope.messageOn='Online puja available';   
                                            $scope.showBookbtn=true;
                                            $scope.orPujaItmTemp();
                                        }
                                        else
                                        {
                                            $scope.messageOn='Online puja not available';   
                                            $scope.showBookbtn=false;
                                        }
                                    }
                                });
                        }
                    }
                }
            }
        };   
        $scope.selGVUser=function(gv)
        {
            if(gv.un!='')
            {
                if(gv.ue!='')
                {
                    if(gv.contact!='')
                    {
                        $scope.formData = {
                                "con"       :   'up_gv_user',
                                "det"       :   gv,
                                "fea"      :   $scope.fea_det[0]
                            };
                        $http({
                            method  :   'POST',
                            url     :   $scope.url,
                            data    :   $scope.formData,
                            headers :   {'Content-Type': 'application/x-www-form-urlencode'}
                        })
                        .then(function(data){
                            data=data.data;
                            if(data==0)
                            {

                            }
                            else if(data!=0)                            
                            {
                                $location.path($scope.dLvl+"cart").replace().reload(false);
//                                window.location.href='https://www.myfuturemirror.com/cart';
                            }
                        });
                    }
                    else
                    {
                        alert('Please Enter Contact');
                    }
                }
                else
                {
                    alert('Please Enter Email');
                }
            }
            else
            {
                alert('Please Enter Name');
            }
        }
        $scope.getDesign=function(seladd)
        {
            $scope.seladdl=0;
            angular.forEach($scope.uaddr, function(value, key)
            {
                if(value.udl_id===seladd)
                {
                    $scope.addItem=value;
                }
            });
            
            if(angular.isDefined($scope.addItem) && angular.isDefined($scope.mDta.cities[0].itm_state))
            {
                
                angular.forEach($scope.mDta.cities[0].itm_state, function(value, key)
                {
                    if(value.state==$scope.addItem.city)
                    {
                        $scope.seladdl=1;
                    }
                });
            }
        }
        $scope.getPrices=function(itemx,st,typesx)/*price =item, st=0 for non state, 1 for indian type=cat*/
        {
            if(typesx=='mainP')
            {
                if(st==0)
                {
                    var tax= Math.ceil(parseFloat(itemx.item_price)*parseFloat(itemx.tax_per)/100);
                    var valx=parseFloat(itemx.item_price)+parseFloat(tax);
                    return valx;
                }
                else
                {
                    return itemx.item_price;
                }
            }
            if(typesx=='mainTot')
            {
                if(st==0)
                {
                    var tax= Math.ceil(parseFloat(itemx.item_price)*parseFloat(itemx.tax_per)/100)*parseFloat(itemx.item_quan);                    
                    var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan)+parseFloat(tax);
                    return valx;
                }
                else
                {
                    var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan);
                    return valx;
                }
            }  
            if(typesx=='mainTotP')
            {
                if(st==0)
                {
                    if(itemx.item_type=='puja')
                    {
                        if(angular.isDefined(itemx.addon) && itemx.addon.length>0)
                        {
                            var tax= Math.ceil(parseFloat(itemx.item_price)*parseFloat(itemx.tax_per)/100)*parseFloat(itemx.item_quan);                    
                            var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan)+parseFloat(tax);
                            angular.forEach(itemx.addon, function(value, key)
                            {
                                valx=parseFloat(valx)+parseFloat(value[0].tax);
                            });                    
                            return valx;
                        }
                        else
                        {
                            var tax= Math.ceil(parseFloat(itemx.item_price)*parseFloat(itemx.tax_per)/100)*parseFloat(itemx.item_quan);                    
                            var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan)+parseFloat(tax);
                            return valx;
                        }
                    }
                    else
                    {
                        var tax= Math.ceil(parseFloat(itemx.item_price)*parseFloat(itemx.tax_per)/100)*parseFloat(itemx.item_quan);                    
                        var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan)+parseFloat(tax);
                        return valx;
                    }                    
                }
                else
                {
                    if(itemx.item_type=='puja')
                    {
                        if(angular.isDefined(itemx.addon) && itemx.addon.length>0)
                        {
                            var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan);
                            angular.forEach(itemx.addon, function(value, key)
                            {
                                valx=parseFloat(valx)+parseFloat(value[0].tax);
                            });
                            return valx;
                        }
                        else
                        {
                            var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan);
                            return valx;
                        }
                    }
                    else
                    {
                        var valx=parseFloat(itemx.item_price)*parseFloat(itemx.item_quan);
                        return valx;
                    }
                    
                }
            }
            if(typesx=='taxTot')
            {
                if(st==0)
                {
                    return 0;
                }
                else
                {
                    var tax= Math.ceil((parseFloat(itemx.item_price)*parseFloat(itemx.item_quan)-itemx.disval)*parseFloat(itemx.tax_per)/100);
                    return tax;
                }
            }              
            if(typesx=='disTot')
            {
                if(st==0)
                {
                    var tax= Math.ceil(parseFloat(item.item_price)*parseFloat(item.tax_per)/100)*parseFloat(item.item_quan);
                    
                    var valx=parseFloat(item.item_price)*parseFloat(item.item_quan)+parseFloat(tax);
                    return valx;
                }
                else
                {
                    var valx=parseFloat(item.item_price)*parseFloat(item.item_quan);
                    return valx;
                }
            }                   
            if(typesx=='grosTot')
            {
                if(st==0)
                {                 
                    var gt=0;
                    angular.forEach($scope.cart_main.cart, function(value, key)
                    {
                        if(value.item_type!='coupon')
                        {
                            if(value.item_type=='puja')
                            {
                                if(angular.isDefined(itemx.addon) && itemx.addon.length>0)
                                {
                                    var tax= Math.ceil(parseFloat(value.item_price)*parseFloat(value.tax_per)/100)*parseFloat(value.item_quan);                    
                                    var valx=parseFloat(value.item_price)*parseFloat(value.item_quan)+parseFloat(tax);
                                    gt=gt+valx-parseFloat(value.disval);
                                    angular.forEach(value.addon, function(value1, key)
                                    {
                                        gt=gt+parseFloat(value1[0].tax);
                                    });
                                }
                                else
                                {
                                    var tax= Math.ceil(parseFloat(value.item_price)*parseFloat(value.tax_per)/100)*parseFloat(value.item_quan);                    
                                    var valx=parseFloat(value.item_price)*parseFloat(value.item_quan)+parseFloat(tax);
                                    gt=gt+valx-parseFloat(value.disval);
                                }
                            }
                            else
                            {
                                var tax= Math.ceil(parseFloat(value.item_price)*parseFloat(value.tax_per)/100)*parseFloat(value.item_quan);                    
                                var valx=parseFloat(value.item_price)*parseFloat(value.item_quan)+parseFloat(tax);
                                gt=gt+valx-parseFloat(value.disval);
                            } 
                        }
                        else
                        {
                            
                        }
                    });
                    $scope.ultimateP=gt;
                    return gt;
                }
                else
                {
                    var gt=0;
                    angular.forEach($scope.cart_main.cart, function(value, key)
                    {
                        if(value.item_type!='coupon')
                        {
                            var valx=$scope.getPrices(value,1,'mainDisTot');
                            gt=parseFloat(gt)+parseFloat(valx);                            
                        }
                    });
                    $scope.ultimateP=gt;
                    return gt;
                }
            }             
            if(typesx=='grndTot')
            {
                if(st==0)
                {
                    var gt=$scope.getPrices(0,0,'grosTot');
                    angular.forEach($scope.cart_main.cart, function(value, key)
                    {
                        if(value.item_type=='coupon')
                        {
                            var dis= Math.ceil(parseFloat(item.item_total));   
                        }
                    });
                    
                    var grand=parseFloat(gt - item.item_total);
                    return gt;
                }
                else
                {
                    var valx=parseFloat(item.item_price)*parseFloat(item.item_quan);
                    return valx;
                }
            }
            if(typesx=='mainDisTot')
            {
                if(st==0)
                {
                    var tot= $scope.getPrices(itemx,0,'mainTotP');                    
                    var taxtot= $scope.getPrices(itemx,0,'taxTot');
                    var totx=parseFloat(tot)+parseFloat(taxtot)-parseFloat(itemx.disval);
                }
                else
                {
                    var tot= $scope.getPrices(itemx,1,'mainTotP');                    
                    var taxtot= $scope.getPrices(itemx,1,'taxTot');
                    var totx=parseFloat(tot)+parseFloat(taxtot)-parseFloat(itemx.disval);
                }
                return totx;
            }
            
            if(typesx=='taxadd')
            {
                var tot= parseFloat(itemx.tax)-parseFloat(itemx.price);    
                return tot;
            }
            
        }
        $scope.globalx=[];
        $scope.orPujaItmTemp=function()
        {
            $scope.tempTotal=0;
            $scope.junk=$scope.itemcart;
            $scope.itmTemp=[];
            $scope.varaap='';
            if(angular.isDefined($scope.fea_det[0].puja_pack[0]['ori']))
            {
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
            else
            {
                $scope.tempTotal=$scope.pujatotal;
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
            .then(function(data){
                data=data.data;
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
            .then(function(data){
                data=data.data;
                if(val=='pending')
                {
                    $scope.cItm=data;
                    $scope.servs.pending=data;
                }
                if(val=='requested')
                {
                    $scope.cItm=data;
                    $scope.servs.requested=data;
                    $log.log('Requestedd :');
                    $log.log($scope.servs.requested);
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
            angular.forEach($scope.servs[type], function(value21, key21)
            {
                if(value21.fea_id==index)
                {
                    $scope.itm_det=value21;
                }
            });
//            $scope.itm_det=$scope.servs[type][index];
            $log.log('itm_det');
            $log.log($scope.itm_det);
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
            .then(function(data){
                data=data.data;
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
//                alert($scope.all.bd.length);
                if($scope.user!='gen' && $scope.all.bd.length>0)
                {
                    $log.log($scope.bd);
                    $scope.show_create=0;
                    if(document.getElementById('xxxx2'))
                    {
                        document.getElementById('xxxx2').style.display='none';
                    }
                }
                else
                {
                    if($scope.user!='gen')
                    {
                        $scope.openWin('','bd_update');
                    }
                }
            });
        };
        $scope.showUpProBD=function(index)
        {
            alert();
            alert($scope.bd.all[index].name);
            $scope.openWin('','bd_update');
//            $scope.formData = {
//                "con"       :   'get_all_bd'
//            };
//            $http({
//                method  :   'POST',
//                url     :   $scope.url,
//                data    :   $scope.formData,
//                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
//            })
//            .then(function(data){data=data.data; 
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
            if($scope.itm_det.fea_id==289 || $scope.itm_det.fea_id==294)
            {
//                alert();
                $scope.openWin('','bd_confirm2');
            }
            else
            {
                if($scope.itm_det.fea_det[0].ctype=='lc')
                {
                    if(angular.isDefined($scope.date_tc) && angular.isDefined($scope.time_tc1) && angular.isDefined($scope.time_tc2))
                    {
                        $scope.openWin('','bd_confirm');
                    }
                    else
                    {
                        alert('please Select a prefered date for conference');
                    }
                }
                else
                {
//                    alert('please wait');
                    $scope.openWin('','bd_confirm');
                }       
            }
        }
        $scope.setConBD2=function(index)
        {
//            $log.log('index'+index);
            $scope.pro2=index;
            $scope.scon1='true';
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
                'dt'        :   $scope.pd,
                'special'   :   $scope.itm_det.fea_det[0].special
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){data=data.data; 
                $scope.closeWin();
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
        };
        $scope.reqServiceCon2=function()
        {
            $scope.pd=[];
            $scope.pd.date=$scope.date_tc;
            $scope.pd.time=$scope.time_tc1+':'+$scope.time_tc2;
            $scope.formData = {
                "con"       :   'req_ser_consume2',
                'fea_id'    :   $scope.itm_det.fea_det[0].fea_id,
                'bd_id'     :   $scope.pro1.bd_id,
                'bd_id2'     :   $scope.pro2.bd_id,
                'dt'        :   $scope.pd
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){data=data.data; 
                $scope.closeWin();
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
        };
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
                .then(function(data){data=data.data; 
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
            $scope.cfi=1;
//            $log.log('req..................................');
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
            .then(function(data){data=data.data; 
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
            .then(function(data){data=data.data; 
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
                
                $scope.openWin('','bd_update');
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
            .then(function(data){data=data.data; 
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
                }).then(function (data, status, headers, config) {
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
        $scope.truHtmlVidR=function(id,val)
        {
            var string = val;
            if(string)
            {
                var result = string.replace('height="auto"', 'height="500px"');
                document.getElementById(id).innerHTML=result;
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
            .then(function(data){
                data=data.data;
//                $log.log('_'+id+'++');
                $scope.cart_main.cart=data.cart; 
                $scope.globalx.cartdisc=[];
                $scope.totDisc=0;
                $scope.statDisc=0;
                angular.forEach($scope.cart_main.cart, function(value, key) 
                {
                    $scope.cntCart=$scope.cntCart+1;
                    if(value.item_type=='coupon')
                    {
                        $scope.totDisc=parseFloat(value.item_total);
                        $scope.statDisc=$scope.totDisc;
                    }
                });
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
                $scope.openWin('','delLoc');
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
                }).then(function (data) {    
                    var i=0;
                    var features=[];
                    $log.log('test datax');
                    $log.log(data);
                    angular.forEach(data.data.temples, function(value, key) {
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
            $scope.openWin('','templs');
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
            .then(function(data){
                data=data.data;
                alert("Thank You for Contacting Us. We will get back to you soon.");
                document.getElementById('inpsq1').disabled=false;
                $scope.closeWin();
            });
        }
        $scope.submitQuery2=function(pagex,modelx)
        {
            document.getElementById('inpsq1').disabled=true;
            $scope.itemData=modelx;
            var captchResponse = $('#g-recaptcha-response').val();
            $log.log(captchResponse);
            if(captchResponse.length == 0 )
            {
              alert('Please check the captcha');  
            }
            else
            {
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
                .then(function(data){
                    data=data.data;
                    alert("Thank You for Contacting Us. We will get back to you soon.");
                    document.getElementById('inpsq1').disabled=false;
                $scope.closeWin();
                });
            }
             
        }
        
        
        
        $scope.getWallet=function()
        {
             $scope.formData = {
                "con"       :   'get_wallet'
            };
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.formData,
                headers :   {'Content-Type': 'application/x-www-form-urlencode'}
            })
            .then(function(data){
                data=data.data;
                $scope.wallet=data;
            });
        }
        
        $scope.showSuprt=function()
        {
            $scope.openWin('','suprt');
        }
        
        $scope.spclPuja=function()
        {
            var d1='puja';
            var dt=$scope.fea_det[0]['puja_pack'][0]['fixed_date'];
            var d3=$scope.fea_det[0].puja_pack[0].pp_id;
//            $scope.uaddr[$scope.addrsel]['udl_id']=0;
            $scope.pt_radio='';
            $scope.puja_type=''
            $scope.sel_city_puja='';
            $scope.params = {
            "con"       :   "add2c_item_spcl",
            "uid"       :   $scope.uid,
            "type"      :   d1,
            'item'      :   $scope.selAdnItm,
            'subfea'    :   d3+','+dt+','+$scope.sel_city_puja+','+$scope.puja_type+','+$scope.pt_radio+',0'
            };
            $log.log('Params');
            $log.log($scope.params);
            $http({
                method  :   'POST',
                url     :   $scope.url,
                data    :   $scope.params,
                headers :   {'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(data){
                data=data.data;
                $scope.alerts('alertsuc','Order Confirmed');
                $location.path($scope.dLvl+"live").replace().reload(false);
//                window.location.href='https://www.myfuturemirror.com/live';
            });
        }
        $scope.spclItem=function(d2,d3)
        {
            var d1='item';
                var d2id=d2.fea_id;
            $scope.params = {
            "con"       :   "add2c_item2_spcl",
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
            }).then(function(data){
                data=data.data;
                $scope.alerts('alertsuc','Free Item Purchase Complete');                
                $scope.returnItem=atob(data);
                $scope.openWin('','free_item');
            });
            
            
           
        }        
        $scope.pujaCheckGroup=function()
        {
//            $log.log($scope.fea_det[0]);
            if($scope.fea_det[0]['puja_pack'][0]['group']==1)
            {
//                alert();
                $scope.openWin('','add_sel');
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
                $log.log($scope.fea_det[0]['puja_pack'][0]);
                if($scope.fea_det[0]['puja_pack'][0]['fixed_date']!=null)
                {
                    $scope.openWin('','add_sel');
                    
                }
                else
                {
                    $scope.openWin('','puja');
                }
            }
            
        }  
        $scope.closeModal=function(mdwin,modsh)
        {
            $scope.modalWin=mdwin;
            $scope.modalShown=modsh;
        }        
        $scope.vastuContact=function(con,sel)
        {
            $scope.conCon=con;
            $scope.conSel=sel;
            $scope.openWin('','vastu_raq');
        }        
        $scope.showUpBD=function(prox)
        {
//            alert();
//            $log.log(prox);
            $scope.bdup1=[];
            var x=$scope.all.bd[prox];
            $scope.bdup1=angular.copy(x);
            $scope.show_create=2;
//            alert($scope.show_create);
        }   
        
        
        $scope.getBdv1=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_bd_v1',"uid":$scope.user},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function onSuccess(dts) 
            {
                $log.log('data set>>>');                
                $log.log(dts);
                $scope.bd=dts.data['bd'];
                if($scope.user!='gen')
                {
                    if(dts.data.status=="verify")
                    {
                        $location.path($scope.dLvl+"checkotp").replace().reload(false);
//                        window.location.href='https://www.myfuturemirror.com/checkotp';
                    }
                    else
                    {
                        if(!angular.isDefined($scope.bd.bd_id))
                        {
//                            $location.path($scope.dLvl+"create_birth_details").replace().reload(false);
//                            window.location.href='https://www.myfuturemirror.com/create_birth_details';
                        }
                    }                    
                    $scope.noties=dts.data['noti'];
                    if(dts.data['user']['pro_pic']=='')
                    {
                        $scope.proPic='';
                    }
                    else
                    {
                        $scope.proPic=dts.data['user']['pro_pic'];
                    }
                    $scope.user_name=dts.data['user']['fn_u_name'];  
                    $scope.cart_main=[];
                    $scope.cart_main.cart=dts.data['cart'];
                    $scope.globalx.cartdisc=[];
                    
                        $scope.cTotal=0;
                    if(angular.isDefined($scope.cart_req))
                    {
                        $scope.c_gt=0;
                        $scope.c_total=0;
                        $scope.c_cou='';
                        $scope.c_dis=0;
                        $scope.c_ap=0;
                        $scope.cTotal=0;
                        $scope.totDisc=0;
                        $scope.statDisc=0;
                        angular.forEach($scope.cart_main.cart, function(value, key) 
                        {
                            if(value.item_type=='coupon')
                            {
                                  $scope.totDisc=parseFloat(value.item_total);
                            }
                        });
                        angular.forEach($scope.cart_main.cart, function(value, key) 
                        {
                            $log.log('Value item :');
                            $log.log(value);
                            $scope.cntCart=$scope.cntCart+1;
                            if(value.item_type!='coupon')
                            {
                                  $scope.c_total=parseFloat($scope.c_total)+parseFloat(value.item_total);
                            }
                            else
                            {
                                $scope.totDisc=parseFloat(value.item_total);
                                $scope.statDisc=$scope.totDisc;
                                if(value.item_ap>0)
                                {
                                    $scope.ad_deduct='yes';
                                }
                                else
                                {
                                    $scope.ad_deduct='no';
                                }
                                $scope.c_dis=parseFloat(value.item_total);
                            }
                            $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                        });
                        $scope.c_gt=parseFloat($scope.c_total)-parseFloat($scope.c_dis);
//                        $log.log("XXXXXXXXXXX>>>>>>>>");
//                        $log.log($scope.c_gt+"<X>"+$scope.c_total+"<X>"+$scope.c_dis);
                        $scope.c_dis=0;
                        $scope.updata=0;
                        $scope.cart_item_count= parseInt($scope.cTotal)-1;
//                        if($scope.cart_main.cart)
        //                alert();
//                        $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
                        if($scope.cart_item_count<1)
                        {
                            $scope.cart_item_count=0;
                        }
                    }
                    else
                    {
                        angular.forEach($scope.cart_main.cart, function(value, key) 
                        {                            
                            $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                        });
                        $scope.cart_item_count= parseInt($scope.cTotal)-1;
//                        $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
                        if($scope.cart_item_count<1)
                        {
                            $scope.cart_item_count=0;
                        }
                    }
                    $scope.dosha=dts.data['doshas'];
                    $scope.wallet=dts.data['wallet'];
                    $scope.uaddr=dts.data['addresses'];
                    $scope.horo=dts.data['spec_horo'];          
                    $scope.uGot=dts.data['gotras'];          
                }
                
                $scope.genhoro=dts.data['gen_horo'];
                $scope.panchang=dts.data['panchang'];
                $log.log("asdasdasd");
                $log.log(dts.data);
            });
            
        };
        $scope.getBdv1Cart=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_bd_v1',"uid":$scope.user},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.bd=data['bd'];
                $scope.totDisc=0;
                $scope.statDisc=0;
                if($scope.user!='gen')
                {
                    if(data.status=="verify")
                    {
                        $location.path($scope.dLvl+"/checkotp").replace().reload(false);
//                        window.location.href='https://www.myfuturemirror.com/checkotp';
                    }
                    else
                    {
                        if(!angular.isDefined($scope.bd.bd_id))
                        {
//                            $location.path($scope.dLvl+"create_birth_details").replace().reload(false);
//                            window.location.href='https://www.myfuturemirror.com/create_birth_details';
                        }
                    }                    
                    $scope.noties=data['noti'];
                    if(data['user']['pro_pic']=='')
                    {
                        $scope.proPic='';
                    }
                    else
                    {
                        $scope.proPic=data['user']['pro_pic'];
                    }
                    $scope.user_name=data['user']['fn_u_name'];  
                    $scope.cart_main.cart=data['cart'];
                    $scope.globalx.cartdisc=[];
                    
                        $scope.cTotal=0;
                    if(angular.isDefined($scope.cart_req))
                    {
                        $scope.c_gt=0;
                        $scope.c_total=0;
                        $scope.c_cou='';
                        $scope.c_dis=0;
                        $scope.c_ap=0;
                        $scope.cTotal=0;
                        angular.forEach($scope.cart_main.cart, function(value, key) 
                        {
                            $log.log('Value item :');
                            $log.log(value);
                            $scope.cntCart=$scope.cntCart+1;
                            if(value.item_type!='coupon')
                            {
                                  $scope.c_total=parseFloat($scope.c_total)+parseFloat(value.item_total);
                            }
                            else
                            {
                                $scope.totDisc=parseFloat(value.item_total);
                                $scope.statDisc=$scope.totDisc;
//                                $log.log(value.item_ap);
//                                $log.log('>>>>>>>>>>');
                                if(value.item_ap>0)
                                {
                                    $scope.ad_deduct='yes';
                                }
                                else
                                {
                                    $scope.ad_deduct='no';
                                }
                                $scope.c_dis=parseFloat(value.item_total);
                            }
                            $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                        });
                        $scope.c_gt=parseFloat($scope.c_total)-parseFloat($scope.c_dis);
//                        $log.log("XXXXXXXXXXX>>>>>>>>");
//                        $log.log($scope.c_gt+"<X>"+$scope.c_total+"<X>"+$scope.c_dis);
                        $scope.c_dis=0;
                        $scope.updata=0;
                        $scope.cart_item_count= parseInt($scope.cTotal)-1;
//                        if($scope.cart_main.cart)
        //                alert();
//                        $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
                        if($scope.cart_item_count<1)
                        {
                            $scope.cart_item_count=0;
                        }
                    }
                    else
                    {
                        angular.forEach($scope.cart_main.cart, function(value, key) 
                        {
                            if(value.item_type=='coupon')
                            {
                                $scope.totDisc=parseFloat(value.item_total);
                                $scope.statDisc=$scope.totDisc;
                            }
                            $scope.cTotal=$scope.cTotal+parseInt(value.item_quan);
                        });
                        $scope.cart_item_count= parseInt($scope.cTotal)-1;
//                        $scope.cart_item_count= parseInt($scope.cart_main.cart.length)-1;
                        if($scope.cart_item_count<1)
                        {
                            $scope.cart_item_count=0;
                        }
                    }
                    $scope.dosha=data['doshas'];
                    $scope.wallet=data['wallet'];
                    $scope.uaddr=data['addresses'];
                    $scope.horo=data['spec_horo'];          
                    $scope.uGot=data['gotras'];          
                }
                $scope.allCities=data['xcities'];
                $scope.genhoro=data['gen_horo'];
                $scope.panchang=data['panchang'];
                if($scope.selAddrId!='')
                    {
                        $scope.getDesign($scope.selAddrId);
                    }
//                $log.log("asdasdasd");
//            $log.log(data);
            });
            
        };
        
        $scope.getPriceCal=function(typ,itms)
        {
            if(typ=='sgst')
            {
                if($scope.ad_deduct=='yes')
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.kp=(itms.item_quan*itms.kp);
                    $scope.va_l1.sgst=parseFloat(itms.tax_dept.sgst)/100;
                    $scope.va_l1.ret=($scope.va_l1.total-$scope.va_l1.kp)*$scope.va_l1.sgst;
                }
                else
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.sgst=parseFloat(itms.tax_dept.sgst)/100;
                    $scope.va_l1.ret=($scope.va_l1.total)*$scope.va_l1.sgst;
                }
            }
            if(typ=='cgst')
            {
                if($scope.ad_deduct=='yes')
                {
                    $scope.va_l1=[];
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.kp=(itms.item_quan*itms.kp);
                    $scope.va_l1.cgst=parseFloat(itms.tax_dept.cgst)/100;
                    $scope.va_l1.ret=($scope.va_l1.total-$scope.va_l1.kp)*$scope.va_l1.cgst;
                }
                else
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.cgst=parseFloat(itms.tax_dept.cgst)/100;
                    $scope.va_l1.ret=($scope.va_l1.total)*$scope.va_l1.cgst;
                }
            }
            if(typ=='tot')
            {
                if($scope.ad_deduct=='yes')
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.kp=(itms.item_quan*itms.kp);
                    $scope.va_l1.cgst=parseFloat(itms.tax_dept.cgst)/100;
                    $scope.va_l1.sgst=parseFloat(itms.tax_dept.sgst)/100;
                    $scope.va_l1.ret=($scope.va_l1.total-$scope.va_l1.kp)+(($scope.va_l1.total-$scope.va_l1.kp)*$scope.va_l1.cgst)+(($scope.va_l1.total-$scope.va_l1.kp)*$scope.va_l1.sgst);
                }
                else
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.cgst=parseFloat(itms.tax_dept.cgst)/100;
                    $scope.va_l1.sgst=parseFloat(itms.tax_dept.sgst)/100;
                    $scope.va_l1.ret=parseFloat($scope.va_l1.total)+parseFloat($scope.va_l1.total*$scope.va_l1.cgst)+parseFloat($scope.va_l1.total*$scope.va_l1.sgst);
                }
            } 
            if(typ=='gsta')
            {
                if($scope.ad_deduct=='yes')
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
                    $scope.va_l1.kp=(itms.item_quan*itms.kp);
                    $scope.va_l1.ret=$scope.va_l1.total-$scope.va_l1.kp;
                }
                else
                {
                    $scope.va_l1=[]
                    $scope.va_l1.total=itms.item_total;
//                    $scope.va_l1.sgst=parseFloat(itms.tax_dept.sgst)/100;
//                    $log.log($scope.va_l1);
                    $scope.va_l1.ret=$scope.va_l1.total;
                }
            }            
            return $scope.va_l1.ret;
        }
        
        $scope.getPujaInner=function(fea_name,fea_id)
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'puja_inner_v1',"fea_id":fea_id},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.allCities=data['cities'];                 
                if(fea_name==$scope.getHyphenated(data['puja_det'][0].puja_name))
                {
//                        alert($scope.getHyphenated(data.item.fea_name));
                    $scope.fea_det=data['puja_det'];
                    $scope.timeDure=$scope.fea_det[0].puja_pack[0].time;
                    $scope.pujatotal=$scope.fea_det[0].puja_pack[0].package_price;
                    angular.forEach($scope.fea_det[0].puja_pack[0].addons, function(value, key)
                    {
                        $scope.sel[value.item_name]='';
                    });
                }
                $scope.astro_ex=data['header_itms']['astro_exclusive'];
                $scope.addPujaView(fea_id,$scope.user);
                $scope.tags=data['tags'];
                $scope.AllItemsHdr=data['header_itms']; 
                
            });
        };
        $scope.getcartInnerv1=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'cart_v1'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.allCities=data['cities'];
                $scope.astro_ex=data['header_itms']['astro_exclusive'];
                $scope.AllItemsHdr=data['header_itms']; 
                
            });
        };        
        $scope.getOfrsv1=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'ofrs_v1'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $scope.allCities=data['cities'];
                $scope.astro_ex=data['header_itms']['astro_exclusive'];
                $scope.AllItemsHdr=data['header_itms']; 
                $scope.ords=data['orders']; 
                $scope.ofrs=data['offers']; 
                $scope.per_ofr=data['per_ofr'];                
            });
        };
        $scope.getOfIds=function()
        {            
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'get_ofr_ids'},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                $log.log(data);
                $scope.ords=data['orders'];            
            });
        };
        
        $scope.redmOfr=function()
        {
            $scope.retrn_val='';
            document.getElementById('redm').disabled='true';
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'redm_ofer','od':$scope.ofrs.od},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                document.getElementById('redm').disabled='false';
                $log.log(data);
                $scope.ofrs.od='';
                $scope.ords=data['orders'];
                $scope.retrn_val=data['return'];
                
            });
        }
        
        $scope.cartProceed=function()
        {
            $scope.openWin('','delLoc_1');
//            document.getElementById('redm').disabled='true';
//            $http({
//                method  : 'POST',
//                url     : $scope.url,
//                data    : {"con":'redm_ofer','od':$scope.ofrs.od},
//                headers : {'Content-Type':'application/x-www-form-urlencoded'}
//            })
//            .then(function(data){data=data.data;  
//            {       
//                document.getElementById('redm').disabled='false';
//                $log.log(data);
//                $scope.ofrs.od='';
//                $scope.ords=data['orders'];
//                $scope.retrn_val=data['return'];
//                
//            });
        }
        
        
        $scope.ocOfr=function()
        {
//            alert('Logged In');
            if(angular.isDefined($scope.pageOn))
            {
                if($scope.pageOn=='offers')
                {
//                    alert('Logged In2');
                    $scope.getOfIds();
                }
            }
        }
        $scope.timeRemi=function(val,type)
        {
            if(type==1)
            {
                if(val<=59)
                {
                    return val+' minutes';
                }
                else
                {
                    var hour=Math.floor(val/60);
                    var minu=val%60;
                    if(Math.floor(hour/24)>=1)
                    {
                        var days=Math.floor(hour/24);
                        hour=hour%24;
                        return days+' days';
                    }
                    else
                    {
                        return hour+' hour ';
                    }
                }
            }
            else
            {
                var hour=val;
//                    var minu=val%60;
                if(Math.floor(hour/24)>=1)
                {
                    var days=Math.floor(hour/24);
                    hour=hour%24;
                    return days+' days';
                }
                else
                {
                    return hour+' hour ';
                }
                
            }
        }
        $scope.resetAllPuja=function()
        {
            $scope.puja_type=='basic';
            angular.forEach($scope.fea_det[0].puja_pack[0].addons, function(value, key)
            {
//                $scope.sel[value.item_name]='';
//                var e=document.getElementById('sel'+value.item_name);
//                var x=e.options[e.selectedIndex].value;
                $scope.sel[value.item_name]='';
            });
            $scope.showPrice();
        }
        $scope.getProx=function(id)
        {
//            alert(id);
//            $log.log('Bd sec : other :');
            angular.forEach($scope.all.bd, function(value, key) 
            {
//                $log.log('Bd sec : '+id+'other :'+value.bd_id);
//                $log.log(value);
                if(value.bd_id==id)
                {
//                    $log.log('>>>>>>>>>>>>>xxxxxx'+value.name);
                    return value.name;
                }
            });
        }
        $scope.subSubmit=function()
        {
            document.getElementById('subSubmit').disabled='true';
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'subscriber','em':$scope.txtSubEmail},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
                document.getElementById('subSubmit').disabled='false';
                $log.log(data);
                alert('Thank You');                
            });
        }
        $scope.searchThis=function(valx)
        {
            var itmval=encodeURI(valx);
            $http({
                method  : 'POST',
                url     : $scope.url,
                data    : {"con":'search_this','itm': itmval},
                headers : {'Content-Type':'application/x-www-form-urlencoded'}
            })
            .then(function(data){
                data=data.data;
            });
        }
        $scope.changeTimeX=function(xT)
        {
            var ww=moment(xT,'HH:mm:ss');
//            $log.log('passed'+xT);
            var xx=ww.subtract({'hours': 5, 'minutes': 12, 'seconds':0}).format('hh:mm:ss');
            $log.log('Subbed'+xx);            
//            $log.log('passed'+xT);
            return xx.toString();
        };
        $scope.loaderState=function(cal)
        {
            document.getElementById("xxxx2").style.display="none";
        }
        
        function Route1Controller($scope, $routeParams) {
//            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            $log.log($routeParams);
//            $scope.ID = $routeParams.ID;
        }
        
        Date.prototype.getWeek = function () {
            var jan4th = new Date(this.getFullYear(), 0, 4);
            return Math.ceil((((this - jan4th) / 86400000) + jan4th.getDay() + 1) / 7);
        }        
//        document.getElementById('xxxx').style.display='none';   



    }]);

appAll.service('adminService', ['$http', function($http){   
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
    
    
    
    
appAll.run( function (ngMeta,$rootScope) {
    ngMeta.init();
    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
//        console.log("$stateChangeStart " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
      });
      $rootScope.$on('$stateChangeSuccess', function() {
//        console.log("$stateChangeSuccess " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
      });
      $rootScope.$on('$stateChangeError', function() {
//        console.log("$stateChangeError " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
      });
});



appAll.config(['$stateProvider', '$locationProvider', 'ngMetaProvider','ADMdtpProvider','calendarConfig',
    function($stateProvider, $locationProvider, ngMetaProvider,ADMdtp,calendarConfig) 
    {
//        console.log('calendarConfig');
        console.log(calendarConfig);
        calendarConfig.templates.calendarMonthView = 'https://www.myfuturemirror.com/inc/templates/calendarMonthView.html'; 
        calendarConfig.templates.calendarMonthCell = 'https://www.myfuturemirror.com/inc/templates/calendarMonthCell.html'; 
        calendarConfig.templates.calendarDayView = 'https://www.myfuturemirror.com/inc/templates/calendarDayView.html'; 
        calendarConfig.templates.calendarWeekView = 'https://www.myfuturemirror.com/inc/templates/calendarWeekView.html'; 
        calendarConfig.dateFormatter = 'moment';
        calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
        calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
        calendarConfig.i18nStrings.weekNumber = 'Week {week}';
        calendarConfig.displayAllMonthEvents = true;
        calendarConfig.showTimesOnWeekView = true;
        
        var home = {
            name: 'Home',
            url: '/',
            templateUrl: 'pages/index',
            controller: function($stateParams) {
                            document.getElementById("xxxx2").style.display="block";
                        },
                        controllerAs: 'ctrl'
          };

          var about = {
            name: 'about',
            url: '/about',
            templateUrl: 'pages/about',
            controller: function($stateParams) {
                            document.getElementById("xxxx2").style.display="block";
                            var self=this;
                        },
                        controllerAs: 'ctrl'
            
          };
          var astrology = {
            name: 'astrology',
            url: '/astrology',
            templateUrl: 'pages/astrology',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);

                            var self=this;
                            $stateParams.param1=1;
                            $stateParams.param2="Kundali Related";
                        },
                        controllerAs: 'ctrl'
          };
          
          var astrology2 = {
            name: 'astrology2',
            url: '/astrology/:param1/:param2',
//            templateUrl: 'pages/astrology.php',
            templateUrl: 'pages/astrology?vvv{{ctrl.id}}vvv{{ctrl.qStrName}}',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            self.id = $stateParams.param1;
                            self.qStrName = $stateParams.param2;
                        },
                        controllerAs: 'ctrl'
          };
          var services = {
            name: 'services',
            url: '/services/:param2/:param1',
            templateUrl: 'pages/services?vvv{{ctrl.id}}vvv{{ctrl.qStrName}}',
            controller: function($stateParams) {
                            document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            self.id = $stateParams.param1;
                            self.qStrName = $stateParams.param2;
                        },
                        controllerAs: 'ctrl'
          };
          var exservices = {
            name: 'exservices',
            url: '/exclusive_services/:param2/:param1',
            templateUrl: 'pages/exclusive_services?vvv{{ctrl.id}}vvv{{ctrl.qStrName}}',
            controller: function($stateParams) {
                            document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            self.id = $stateParams.param1;
                            self.qStrName = $stateParams.param2;
                        },
                        controllerAs: 'ctrl'
          };
          var teleservices = {
            name: 'teleservices',
            url: '/tele_services/:param2/:param1',
            templateUrl: 'pages/tele_services?vvv{{ctrl.id}}vvv{{ctrl.qStrName}}',
            controller: function($stateParams) {
                            document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            self.id = $stateParams.param1;
                            self.qStrName = $stateParams.param2;
                        },
                        controllerAs: 'ctrl'
          };
          var puja = {
            name: 'puja',
            url: '/puja',
            templateUrl: 'pages/puja',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            $stateParams.param1=1;
                            $stateParams.param2="Kundali Related";
                        },
                        controllerAs: 'ctrl'
          };
          var puja2 = {
            name: 'puja2',
            url: '/puja/:param1/:param2',
//            templateUrl: 'pages/astrology.php',
            templateUrl: 'pages/puja?vvv{{ctrl.id}}vvv{{ctrl.qStrName}}',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            self.id = $stateParams.param1;
                            self.qStrName = $stateParams.param2;
                        },
                        controllerAs: 'ctrl'
          };
          var pujas = {
            name: 'pujas',
            url: '/pujas/:param1/:param2',
//            templateUrl: 'pages/astrology.php',
            templateUrl: 'pages/pujas?vvv{{ctrl.id}}vvv{{ctrl.qStrName}}',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
//                            console.log($routeParams.param1);
                            var self=this;
                            self.id = $stateParams.param1;
                            self.qStrName = $stateParams.param2;
                        },
                        controllerAs: 'ctrl'
          };
          var cart = {
            name: 'cart',
            url: '/cart',
//            templateUrl: 'pages/astrology.php',
            templateUrl: '/pages/cart',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var numerology = {
            name: 'numerology',
            url: '/numerology',
            templateUrl: '/pages/numerology',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var vastu = {
            name: 'vastu',
            url: '/vastu',
            templateUrl: '/pages/vastu',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var videos = {
            name: 'videos',
            url: '/video',
            templateUrl: '/pages/videos',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var videoind = {
            name: 'videoind',
            url: '/video/:param1',
            templateUrl: '/pages/ind_vid?vvv{{ctrl.id}}',
            controller: function($stateParams) 
            {
                document.getElementById("xxxx2").style.display="block";
                var self=this;
                self.id = $stateParams.param1;
            },
            controllerAs: 'ctrl'
          };
          var blogs = {
            name: 'blogs',
            url: '/blog',
            templateUrl: '/pages/blogs',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var blogsind = {
            name: 'blogsind',
            url: '/blog/:param1',
            templateUrl: '/pages/ind_blog?{{ctrl.id}}',
            controller: function($stateParams) 
            {
                document.getElementById("xxxx2").style.display="block";
                var self=this;
                self.id = $stateParams.param1;
            },
            controllerAs: 'ctrl'
          };
          
          var panchang = {
            name: 'panchang',
            url: '/panchang',
            templateUrl: '/pages/panchang',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var festivals = {
            name: 'festivals',
            url: '/festivals',
            templateUrl: '/pages/festivals',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var live = {
            name: 'live',
            url: '/live',
            templateUrl: '/pages/live',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var account = {
            name: 'account',
            url: '/account',
            templateUrl: '/pages/account',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var contact = {
            name: 'contact',
            url: '/contact',
            templateUrl: '/pages/contact',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var invoices = {
            name: 'invoices',
            url: '/invoices',
            templateUrl: '/pages/invoices',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var reports = {
            name: 'reports',
            url: '/reports',
            templateUrl: '/pages/reports',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var purchased_services = {
            name: 'purchased_services',
            url: '/purchased_services',
            templateUrl: '/pages/purchased_services',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var create_birth_details = {
            name: 'create_birth_details',
            url: '/create_birth_details',
            templateUrl: '/pages/create_birth_details',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var terms = {
            name: 'terms',
            url: '/terms',
            templateUrl: '/pages/terms',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };
          var privacy = {
            name: 'privacy',
            url: '/privacy',
            templateUrl: '/pages/privacy',
            controller: function($stateParams) {
                document.getElementById("xxxx2").style.display="block";
            },
            controllerAs: 'ctrl'
          };

          $stateProvider.state(home);
          $stateProvider.state(about);
          $stateProvider.state(astrology);
          $stateProvider.state(astrology2);
          $stateProvider.state(services);
          $stateProvider.state(exservices);
          $stateProvider.state(teleservices);
          $stateProvider.state(puja);
          $stateProvider.state(puja2);
          $stateProvider.state(pujas);
          $stateProvider.state(cart);
          $stateProvider.state(vastu);
          $stateProvider.state(numerology);
          $stateProvider.state(panchang);
          $stateProvider.state(festivals);
          $stateProvider.state(videos);
          $stateProvider.state(videoind);
          $stateProvider.state(blogs);
          $stateProvider.state(blogsind);
          $stateProvider.state(live);
          $stateProvider.state(contact);
          $stateProvider.state(account);
          $stateProvider.state(invoices);
          $stateProvider.state(reports);
          $stateProvider.state(purchased_services);
          $stateProvider.state(create_birth_details);
          $stateProvider.state(terms);
          $stateProvider.state(privacy);
          
//        $routeProvider
//            // route for the home page
//            .when('/', {
//                templateUrl : 'pages/home.php',
//                controller  : 'mainController',
//                data: {
//                    meta: {
//                      'title': 'Home page',
//                      'description': 'This is the description shown in Google search results'
//                    }
//                  },
//                resolve: {
//                init: function($scope) {
//                    $scope.initAllF($scope.user);
//                }
//          }
//                  
//            })
//
//            // route for the about page
//            .when('/about', {
//                templateUrl : 'pages/about.html',
//                controller  : 'aboutController',
//                data: {
//                    meta: {
//                      'title': 'about page',
//                      'description': 'This is the description shown in Google search results'
//                    }
//                  }
//            })
//
//            // route for the contact page
//            .when('/contact', {
//                templateUrl : 'pages/contact.php',
//                controller  : 'contactController',
//                data: {
//                    meta: {
//                      'title': 'about page',
//                      'description': 'This is the description shown in Google search results'
//                    }
//                  }
//            });
//            
            
            $locationProvider.html5Mode(true);
            ADMdtp.setOptions({
            calType: 'gregorian',
            format: 'YYYY/MM/DD',
            default: 'today',
            autoClose: 'true'
        });
    }]
);

appAll.filter('languFilter',function(){        
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

var xdt=new Date();
var xmon='';
var xyr='';
    
appAll.filter('filFest',function()
{ 
    return function(datasource, val){
        var out = [];
        if(val)
        {
            var dtarr = val.split(" ");
            
                var startDate = new Date(dtarr[1]+","+ (new Date(Date.parse(dtarr[0] +" 1, "+dtarr[1])).getMonth()+1)+",1") , 
                    endDate   = new Date(dtarr[1]+","+ (new Date(Date.parse(dtarr[0] +" 1, "+dtarr[1])).getMonth()+2)+",1");

                angular.forEach(datasource, function(record){
                    var xdate=record.startsAt;
                    if(xdate>startDate && xdate<endDate)
                    {
                        out.push(record);
                    }
                });
//                xmon=dtarr[0];
//                xyr=dtarr[1];
//            }
        }
        return out;
    }
    
});
    
appAll.filter('checkBase',function(){        
        return function(datasource){
            var out = [];
            angular.forEach(datasource, function(record){            
                if(record['fea_type'] == 'base'){
                    out.push(record);
                }
            });
            return out;
        };
    });
    
appAll.directive('uploadFiles', function () {
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

appAll.filter('spaceless',function() {
    return function(input) {
                if (input) {
                    return input.replace(/\s+/g, '-');    
                }
            }
        });
        
appAll.filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  })
  
    
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
    var appElement = document.querySelector('[ng-app=appAll]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function() {
        $scope.dt1_sel = data;
        $scope.callerDta(data);
    });
}

function showLoader(val)
{
    var scope = angular.element($("html")).scope();
    scope.$apply(function(){
        scope.showloader = val;
    })
//    var appElement = document.querySelector('[ng-app=appAll]');
//    var $scope = angular.element(appElement).scope();
//    $scope.$apply(function() {
//        $scope.showloader = val;
//    });
}

function checkUpMon()
{
//    alert(document.getElementById('cmy').innerHTML);
//    console.log(x1);
}

function showTempleDet(id)
{
//    alert(id);
    var appElement = document.querySelector('[ng-app=appAll]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function() {
        $scope.showTempleDet(id);
    });    
}

function setTemples(req)
{
    var appElement = document.querySelector('[ng-app=appAll]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply(function() {
        $scope.templeData = req;        
    });
}

function setCity(data)
{
    
}
