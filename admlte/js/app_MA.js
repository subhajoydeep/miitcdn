var appAll = angular.module('appAll', ['ui.bootstrap', 'angularUtils.directives.dirPagination', 'ngMaterial', "ui.bootstrap.modal", 'ui.router', 'ngMeta','ui.calendar','ngCookies']);
appAll.controller('mainControllerNews', ['$scope', '$http', '$log', '$filter', 'adminService', '$window', '$sce', 'ngMeta','$rootScope','$location','$timeout','$q','$cookies', function ($scope, $http, $log, $filter, adminService, $window, $sce, ngMeta,$rootScope,$location,$timeout,$q,$cookies)
{
    $scope.siteVal={};
    $scope.temp={};
    $scope.dLvl='';
    $scope.filePath=$scope.dLvl+'blank.php';
    $scope.filePathinner=$scope.dLvl+'blank.php';
    $scope.showModal=false;
    $scope.constractorIndex = function () {
        console.log("cons called");            
        $scope.locx="./";
        $scope.qf="scripts/qfinder.php";
        $scope.url="scripts/qfinder.php";
//            $scope.testFunc2();
    }    
    

    $scope.initDBS=function()
    {
        $scope.genFet('get_all_db_det','','','');
        $scope.showNV=true;
        $scope.showLeft='side-right';
        $scope.tab2Show='singleTab.html';
        $scope.editOPT=false;
        if(angular.isDefined($scope.temp))
        {
            $scope.temp.frm={};
        }
        else
        {
            $scope.temp={};
            $scope.temp.frm={};
        }
    }
    $scope.initDashboard=function()
    {
        $scope.genFet('db_dta_all','','','');
        $scope.showNV=true;        
        $scope.genFet('news_commentsx','status','=','review');
    }
    $scope.initProjects=function()
    {
        $log.log('called');
        $scope.genFet('projects_master','','','');
        $scope.showNV=true;
        $scope.fil={};
        $scope.fil.status='';
    }
    $scope.initCategories=function()
    {
        $log.log('called');
        $scope.genFet('news_categories','','','');
        $scope.showNV=true;
        $scope.catCreate='new';
        $scope.fil={};
        $scope.fil.status='';
    }
    $scope.initPostImage=function()
    {
        $log.log('called');
        $scope.genFet('news_categories','','','');
        $scope.showNV=true;
        $scope.temp_img='';
        $scope.insCats={};
        $scope.img_type='image';
        CKEDITOR.replace('cons');  
    }
    $scope.initPostVideo=function()
    {
        $scope.genFet('news_categories','','','');
        $scope.showNV=true;
        $scope.temp_img='';
        $scope.insCats={};
        $scope.img_type='video';
        CKEDITOR.replace('cons2');  
    }
    $scope.initAllPosts=function()
    {
        $scope.genFet('news_posts','','',' order by pub_date desc');
        $scope.genFet('news_comments','','','');
        $scope.genFet('news_categories','','','');
        $scope.showNV=true;
        $scope.fil={};
        $scope.fil.cat_id='';
    }
    $scope.initAllComms=function()
    {
        $scope.genFet('news_commentsx','status','=','review');
        $scope.showNV=true;
        $scope.fil={};
        $scope.fil.cat_id='';
    }
    $scope.initSiteCon=function()
    {
        $scope.genFet('reg_mul_content','','','');
        $scope.showNV=true;
        $scope.fil={};
        $scope.fil.cat_id='';
    }
    
    
    
    
    $scope.logCheck = function (logdt)  
    {
            $http({
                method: 'POST',
                url: $scope.url,
                data: {"con": 'logCheck', 'con_val': logdt},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                    .then(function (datax) {
                        var data = datax.data;
                        $log.log(data);
                        if (angular.isDefined(data.logged))
                        {
                            alert('Welcome');
                            $location.path("/dashboard").replace().reload(false);
//                    window.location.href="http://sabjantaa.com/svevents/reg_back/dashboard";
                        } else
                        {
                            alert('Some thing is not right');
                        }
                    });
    };
    
    $scope.showHtml=function(con)
    {
        return $sce.trustAsHtml(con);
    }

    $scope.getCatDet=function(dtax)
    {
//        $log.log($scope.allCats);
        var retName='none';
        angular.forEach($scope.allCats, function(rec){
            if(rec['cat_id']==dtax)
            {
//                $log.log("Found "+dtax);
//                $log.log(rec);
                retName=rec.cat_name;
            }
        });
        return retName;
    };

    $scope.editPost=function(upPostx)
    {
        $scope.upPost=upPostx;
//        $scope.upPost.pub_date=new Date($scope.upPost.pub_date);
        $scope.openWin('posts','');
        
    }
    $scope.getMainSiteData=function(con)
    {
        $scope.params = {
        "con"       :   "getMainSiteData",
        "con_val"   :   con
        };
        $http({
            method:'post',
            url:$scope.locx+$scope.qf,
            data:$scope.params,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(reslt){
            $log.log("return");
            $scope.siteVal=reslt.data[0];
            $log.log(reslt);
        });
//            alert(2);
    }

    $scope.testFunc=function()
    {
        $scope.user={};
        $scope.user.text="test_post_data";
        $scope.user.rand_number=Math.random();
        $scope.params = {
        "con"       :   "getPizeVal",
        "con_val"   :   $scope.user
        };
        $http({
            method:'post',
            url:$scope.locx+$scope.qf,
            data:$scope.params,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(reslt){
//                $log.log('called int'+reslt.data[0]);
            $scope.SeaVal=reslt.data[0];
            alert(0);
        });
        alert(2);
    }
    $scope.calculateAge=function(birthday) {
//            var bday=birthday.toString();
       if(angular.isDefined(birthday))
        {
            var ageDifMs = Date.now() - birthday.getTime();
           var ageDate = new Date(ageDifMs);
           return Math.abs(ageDate.getUTCFullYear() - 1970);
//                return bdt;
        }
        else
        {
            return 0;
        }
    }        
    $scope.getDate=function(birthday) {

        if(angular.isDefined(birthday))
        {
            var bday=birthday.toString();
            var x=bday.split("-");
            var bdt=new Date(x[0],x[1]-1,x[2]);
            return bdt;
        }
        else
        {
            return 0;
        }
    }
    
    $scope.deactComm=function(itm,stat)
    {
        itm.status=stat;
        $scope.postFormUpdate('news_comments',itm,'com_id',itm.com_id,'');
    }
    $scope.deactComm2=function(itm,stat)
    {
        itm.status=stat;
        $scope.postFormUpdate('news_commentsx',itm,'com_id',itm.com_id,'');
    }

    $scope.showTabDet=function(tab,cols,cls,t2s)
    {
        $scope.tableShow={};
        $scope.tableShow.tab=tab;
        $scope.tableShow.cols=cols;
        $scope.showLeft=cls;
        $scope.tab2Show=t2s;
    }
    $scope.getQueries=function(dta,idx)
    {
        var ins = "insert into "+idx+"(";
        var insvals=" values(";
        $scope.insP="";
        var up="update "+idx+" set ";
        $scope.upP="";
        var upWhere='';
        var del="delete from "+idx+" where ";
        $scope.delP="";

        angular.forEach(dta, function(rec){
            if(rec.COLUMN_KEY=='PRI')
            {
                del=del+rec.COLUMN_NAME+"=:"+rec.COLUMN_NAME;
                $scope.delP="$stmt->bindParam(':"+rec.COLUMN_NAME+"', $r[0]['"+rec.COLUMN_NAME+"']);";
                upWhere=" where "+rec.COLUMN_NAME+"=:"+rec.COLUMN_NAME;
                $scope.upP=$scope.delP;                    
            }
            else
            {
                if(insvals==" values(")
                {
                    ins=ins+rec.COLUMN_NAME;
                    insvals=insvals+":"+rec.COLUMN_NAME;

                }
                else
                {
                    ins=ins+', '+rec.COLUMN_NAME;
                    insvals=insvals+", :"+rec.COLUMN_NAME;
                }
                if(up=="update "+idx+" set ")
                {
                    up=up+rec.COLUMN_NAME+"=:"+rec.COLUMN_NAME;
                }
                else
                {
                    up=up+", "+rec.COLUMN_NAME+"=:"+rec.COLUMN_NAME;
                }                    
                $scope.upP=$scope.upP+"$stmt->bindParam(':"+rec.COLUMN_NAME+"', $r[0]['"+rec.COLUMN_NAME+"']);";
                $scope.insP=$scope.insP+"$stmt->bindParam(':"+rec.COLUMN_NAME+"', $r[0]['"+rec.COLUMN_NAME+"']);";
            }
        });
        $scope.insQ=ins+")"+insvals+")";
        $scope.upQ=up+upWhere;
        $scope.delQ=del;
        $scope.openWin('queries');
    };
    
    $scope.editCats=function(itms)
    {
        $scope.edtCats=itms; 
        $scope.catCreate='edit';
        $scope.openWin('categories');
    }

    $scope.getEdtTav=function(dtax)
    {
        $scope.editOPT=true;
        var itmsx={};
        angular.forEach(dtax, function(rec){
            var xitm={};
            xitm.col_name=rec.COLUMN_NAME;
            xitm.col_type=rec.COLUMN_TYPE;
//                xitm.col_name=rec.COLUMN_NAME;
//                xitm.col_name=rec.COLUMN_NAME;
//                xitm.col_name=rec.COLUMN_NAME;
//                xitm.col_name=rec.COLUMN_NAME;
        });
        $scope.edtTab=dtax;
    };

    $scope.closeWinEdt=function()
    {
        $scope.editOPT=false;
    }

    $scope.selectedItem  = null;
    $scope.searchText    = null;

    $scope.querySearch=function (query) {
        var results = query ? $scope.meds.filter($scope.createFilterForMeds(query) ) : $scope.meds;
//            $log.log(results);
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }
    $scope.querySearch2=function (query) {
        var results = query ? $scope.tests.filter($scope.createFilterForTest(query) ) : $scope.tests;
//            $log.log(results);
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }
    $scope.querySearch3=function (query) {
        var results=query ? $scope.paths.filter($scope.createFilterForCenter(query) ) :$scope.paths;
//            $log.log(results);
        var deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }
//        $scope.callAlert=function()
//        {
//            alert()
//        }

    /**
     * Build `states` list of key/value pairs
     */
    
    $scope.loadAll=function() 
    {
        $scope.params = {
            "con"       :   "getMainSiteData",
            "con_val"   :   'pres'
            };
        $http({
            method:'post',
            url:$scope.locx+$scope.qf,
            data:$scope.params,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(reslt){
            $log.log(reslt.data);
            $scope.siteVal=reslt.data;  
            $scope.meds=$scope.siteVal.medicines;
            $scope.tests=$scope.siteVal.tests;
            $scope.paths=$scope.siteVal.paths;
        });
    }
    
        $scope.postForm=function(x1,x2,hasimg)
        {
            if(x1==='news_posts')
            {
                x2.img_link=$scope.temp_img; 
                x2.post_type=$scope.img_type;
                if(x2.post_type=='image')
                    x2.cons=CKEDITOR.instances['cons'].getData();
                else
                    x2.cons=CKEDITOR.instances['cons2'].getData();
            }
            /*
            if(x1==='reg_services')
            {
                x2.serv_ldesc=CKEDITOR.instances['abt'].getData();
                if(!angular.isDefined(x2.serv_par))
                {
                    x2.serv_par=0;
                }
            }
            else if(x1==='reg_packages')
            {
                x2.pack_desc=CKEDITOR.instances['pack_desc'].getData();                
            }
            else if(x1==='reg_projects')
            {
                x2.l_desc=CKEDITOR.instances['l_desc'].getData();                
            }
            else if(x1==='reg_gallery')
            {
                
            }
            else if(x1==='reg_clients')
            {                
                x2.cl_logo=$scope.cliImg;
            }
            else if(x1==='reg_testimonials')
            {      
//                x2.testimonial=CKEDITOR.instances['testimonial'].getData();
                if(angular.isDefined($scope.cliImg) && $scope.cliImg!="")
                {
                    x2.img_loc=$scope.cliImg;
                    hasimg='img_loc';
                }
                else
                {
                    hasimg='';
                }
            }
            else if(x1==='reg_gallery_video_serv')
            {
                x2.servs=$scope.selAlb.alb_id;
            }
            else if(x1==='reg_gallery_video_proj')
            {
                x2.projs=$scope.selAlbProj.pro_id;
            }
            else if(x1==='banners')
            {
                if($scope.galImg!='')
                {
                    hasimg='img_loc';
                    x2.img_loc=$scope.galImg;
                }
                else
                {
                    hasimg='';
                }
            }
            */
            $scope.params =
            {
                "con": "gen_ins",
                "x1":x1,
                "x2":x2,
                "ret":'all',
                'hasimg':hasimg
            };
            $log.log($scope.params);
            $log.log('$scope.params');
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (data) {
                $log.log(data);
                data = data.data;                            
                $log.log(data);
                if(x1==='news_categories')
                {
                    $scope.allCats=data;
//                    alert('Inserted');
                }
                if(x1==='news_posts')
                {
                    if(data[0]==0)
                    {
                        alert('Inserted');
                    }
                    else
                        alert('Some Problem in Insert');
                }
                if(x1==='home_servs')
                {
                    $scope.allServs=data;
                    alert('Updated');
                }   
                if(x1==='reg_projects')
                {
                    $log.log(data);
                    $scope.allProjs=data;
                    alert('Created');
                }  
                if(x1==='stories')
                {
                    $log.log(data);
                    $scope.allProjs=data;
                    alert('Updated');
                }       
                if(x1==='reg_team')
                {
                    $scope.allTeam=data;
                }
                if(x1==="questions")
                {
                    $scope.allQues=data;
                }
                if(x1==="reg_gallery")
                {
                    $scope.allGals=data;
                }
                if(x1==="reg_gallery_video_serv")
                {
                    alert("Album Added");
                    $scope.selAlb=data.updated[0];
                    $scope.allAlbs=data.all;
                }
                if(x1==="reg_gallery_video_proj")
                {
                    $scope.selAlbProj=data.updated[0];
                    $scope.allProjs=data.all;
                }
                if(x1==="reg_clients")
                {
                    $scope.allClients=data;
                    $scope.cliImg='';
                }
                if(x1==="reg_testimonials")
                {
                    $scope.allTsti=data;
                    $scope.cliImg='';
                }                
                if(x1==="banners")
                {
                    $scope.allBnrs=data;
                }    
            });
        };
        $scope.postFormUpdate=function(x1,x2,k,v,hasimg)/* x1 table,x2 content,k =key,v=val,hasimg=img col*/
        {
            if(x1=='news_posts')
            {
                if($scope.temp_img!='')
                {
                    x2.img_link=$scope.temp_img; 
                }
                if(CKEDITOR.instances['upCons'])
                {
                    x2.cons=CKEDITOR.instances['upCons'].getData();
                }
//                x2.pub_date=document.getElementById('pub_date').value;
            }
            
            $scope.params =
            {
                "con": "gen_up",
                "x1":x1,
                "x2":x2,
                "ret":'all',
                "k":k,
                "v":v,
                "hasImg":hasimg
            };
            $log.log($scope.params);
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (data) {
                data = data.data;
                $log.log('up data');
                $log.log(data);
                if(x1==='news_categories')
                {
                    alert("Service Updated");
                    $scope.genFet("news_categories",'','','');
                }
                if(x1==='news_posts')
                {
                    $scope.closeWin();
                    alert("Post Updated");
                    $scope.allPosts=data;
                }
                if(x1==='news_comments')
                {
//                    alert("Status Updated");
                    $scope.genFet('news_comments','','','');
                }
                if(x1==='news_commentsx')
                {
//                    alert("Status Updated");
                    $scope.genFet('news_commentsx','','','');
                }
                else if(x1==='reg_packages')
                {
                    alert("Package Updated");
                    $scope.allPacks=data;
                    $scope.packCreate='new';
                }
                else if(x1==='reg_mul_content')
                {
//                    $log.log('varCons1');$log.log($scope.varCons);
                    $scope.varCons=data;
                    alert("Updated");
//                    $log.log('varCons');$log.log($scope.varCons);
                }
                else if(x1==='courses')
                {
                    alert("Updated");
                    $scope.allCourses=data;
                }
                else if(x1==='reg_gallery')
                {
                    alert("Updated");
//                    $log.log('$scope.allGals');
                    $scope.allGals=[];
                    $scope.allGals=data;
                }
                else if(x1==='reg_albums')
                {
                    alert("Updated");
//                    $scope.selAlb=data.updated[0];
                    $scope.allAlbs=data.all;
                }
                else if(x1==='reg_projects')
                {
                    $scope.allProjs=data;
                    $scope.projCrt='new';
                    alert('updated');
                }
                else if(x1==='reg_team')
                {
                    alert("Updated");
//                    $log.log($scope.allTeam);
                    $scope.allTeam=data.dta;
                }
                else if(x1==='reg_banners')
                {
                    alert("Updated");
                    $scope.allBnrs=data.all;              
                }
            });
        };
        $scope.delRow=function(x1,k,v,adtnl)
        {     
            if(confirm("Are You Sure you want to Delete This ?"))
            {
                $scope.params =
                {
                    "con": "gen_delCon",
                    "x1":x1,
                    "ret":'all',
                    "k":k,
                    "v":v,
                    "adtnl":adtnl
                };
                $log.log($scope.params);
                $http({
                    method: 'POST',
                    url: $scope.url,
                    data: $scope.params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function (data) {
                    data = data.data;
                    if(x1==='news_categories')
                    {
                        alert("Service Deleted");
                        $scope.closeWin();
                        $scope.genFet("news_categories",'','','');
                    }
                    if(x1==="reg_gallery_video_serv")
                    {
                        $scope.selAlb=data.updated[0];
                        $scope.allAlbs=data.all;
                    }
                    if(x1==="reg_gallery_video_proj")
                    {
                        $scope.selAlbProj=data.updated[0];
                        $scope.allProjs=data.all;
                    }
                    $log.log(data);
                });
            }
        };
        $scope.genFet=function(tab,kv,ktv,vk)
        {
            $scope.params =
            {
                "con": "gen_fetch",
                "tab":tab,
                "kv":kv,
                "ktv":ktv,
                "vk":vk
            };
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type' : 'application/json, text/plain'}
            }).then(function (data) {
                $log.log(data);
                data = data.data;
                if(tab==='news_categories')
                {
                    $scope.allCats=data;
                }
                if(tab==='news_posts')
                {
                    $scope.allPosts=data;
                    
                }
                if(tab==='news_comments')
                {
                    $scope.allComms=data;
                }
                if(tab==='news_commentsx')
                {
                    $scope.allCommsx=data;
                }
                if(tab==='renewals_master')
                {
                    $scope.renewals_master=data;
                }
                if(tab==='reg_projects')
                {
                    $scope.allProjs=data;
                    $log.log('allProjs');
                    $log.log($scope.allProjs);
                    $scope.selAlbProj=$scope.allProjs[0];
                }
                if(tab==='reg_mul_content')
                {
                    $scope.varCons=data;
                    $log.log('varCons');
                    $log.log($scope.varCons);
                    getCK();
                }
                if(tab==='reg_team')
                {
                    $scope.allTeam=data;
                }
                if(tab==='reg_gallery')
                {
                    $scope.allGals=data;
                    $log.log($scope.allGals);
                }
                if(tab==='reg_albums')
                {
                    $scope.allAlbs=data;
                    $log.log($scope.allAlbs);
                    $log.log('allAlbs');
                    $log.log($scope.allAlbs);
                    $scope.selAlb=$scope.allAlbs[0];
                    document.getElementById('ualb_descUP').innerHTML=$scope.selAlb.alb_desc;
                    
                }
                if(tab==='reg_banners')
                {
                    $scope.allBnrs=data;
                    $log.log('allBnrs');
                    $scope.getBnr(1);
                    $log.log($scope.allBnrs);
                }
                if(tab=='get_all_db_det')
                {
                    $scope.allDBtabs=data;
//                    $log.log($scope.allDBtabs);
                }
                if(tab=='othTabsAll')
                {
                    $scope.othTabsAll=data;
                    $log.log($scope.othTabsAll);
                    $log.log($scope.params);
                }
            });
        };

        $scope.postUpdate=function(itm,st)
        {
            itm.status=st;
            $scope.postFormUpdate('news_posts',itm,'post_id',itm.post_id,'');
            
        }
        $scope.fckOn=function(upCons)
        {
            CKEDITOR.replace(upCons);
        }
        /* 
        * Create filter function for a query string
        */
       
        $scope.createFilterFor=function(query) {
            var lowercaseQuery = query.toLowerCase();
            return function filterFn(state) {
                var valxx1=state.m_name;
                valxx1=valxx1.toUpperCase();
                var valxx2=query.toUpperCase();                
//                console.log(state.value+">>>>"+state.value.indexOf(lowercaseQuery))
                return (valxx1.indexOf(valxx2)>=0);
            };
        };
        $scope.createFilterForTest=function(query) {
            return function filterFn(tests) {
                var valxx1=tests.test_name;
                valxx1=valxx1.toUpperCase();
                var valxx2=query.toUpperCase();
                return (valxx1.indexOf(valxx2)>=0);
            };
        };
        $scope.createFilterForMeds=function(query) {
            return function filterFn(meds) {
                var valxx1=meds.m_name;
                valxx1=valxx1.toUpperCase();
                var valxx2=query.toUpperCase();
                return (valxx1.indexOf(valxx2)>=0);
            };
        };
        $scope.createFilterForCenter=function(query) {
            return function filterFn(tests) {
                var valxx1=tests.path_name;
                valxx1=valxx1.toUpperCase();
                var valxx2=query.toUpperCase();
                return (valxx1.indexOf(valxx2)>=0);
            };
        };
        $scope.selectedItemChange=function(x,y)
        {
            if(x==1)
            {
                $scope.temp.selAutoTest=y.test_name;
            }
            if(x==2)
            {
                $scope.temp.selAutoRef=y.path_name;
            }
            if(x==3)
            {
                $scope.temp.selAutoMed=y.m_name;
            }
        }
        
        $scope.addTest=function()
        {
            if(angular.isDefined($scope.temp.selAutoTest) && $scope.temp.selAutoTest!="")
            {
                if(!angular.isDefined($scope.temp.pat))
                {
                    $scope.temp.pat={};
                }                    
                if(angular.isDefined($scope.pat.testsReq) && $scope.pat.testsReq.length>0)
                {
                    
                    $scope.temp.pat.test=$scope.temp.selAutoTest;
                    $scope.temp.pat.ref=$scope.temp.selAutoRef;
                    $scope.pat.testsReq[$scope.pat.testsReq.length]=$scope.temp.pat;
                }
                else
                {
                    $scope.pat.testsReq=[];
                    $scope.temp.pat.test=$scope.temp.selAutoTest;
                    $scope.temp.pat.ref=$scope.temp.selAutoRef;
                    $scope.pat.testsReq[0]=$scope.temp.pat;
                }
            }
            else
            {
                
            }
                
        }
        
        $scope.remTest=function(ind)
        {
            
        }

        $scope.addMeds=function()
        {
            if(angular.isDefined($scope.temp.selAutoMed) && $scope.temp.selAutoMed!="")
            {
                if(angular.isDefined($scope.pat.medPro) && $scope.pat.medPro.length>0)
                {
//                    $scope.pat.medPro=[];                    
                    $scope.pat.ddnts.a.med_name=$scope.temp.selAutoMed;
                    $scope.pat.medPro[$scope.pat.medPro.length]=$scope.pat.ddnts.a;
                }
                else
                {
                    $scope.pat.medPro=[];
                    $scope.pat.ddnts.a.med_name=$scope.temp.selAutoMed;
                    $scope.pat.medPro[0]=$scope.pat.ddnts.a;
                }
                $scope.pat.ddnts.a=[];
            }
            else
            {
                $log.log('searchText4 error');
                alert("Please select Medicine Details.");
            }
        }
        
        $scope.changeTab=function(indx)
        {
            $log.log('clicked');
            $scope.selectedTab= indx;   
            $log.log(this);
        }
        
        $scope.closeWin=function()
        {
            $scope.filePath=$scope.dLvl+'blank.php';
        }
        $scope.openWin=function(loc,qs)
        {
            $scope.filePath=$scope.dLvl+'includes/windows/'+loc+'.php?'+qs;
        }
        $scope.closeWinInner=function()
        {
            $scope.filePathinner=$scope.dLvl+'blank.php';
        }
        $scope.openWinInner=function(loc,qs)
        {
//            $log.log('called');
            $scope.filePathinner=$scope.dLvl+'includes/windows/'+loc+'_inner.php?'+qs;
        }
        
        $scope.showProjDet=function(itm)
        {
            $scope.genFet('proj_table_master','pro_id','=',itm.pro_id);
            $scope.genFet('pro_db_master','pro_id','=',itm.pro_id);
            $scope.genFet('renewals_master','pro_id','=',itm.pro_id);
            $scope.showProDet=itm;
            $scope.openWin('projects');
        }
        
        $scope.setCkFrm=function(tabName)
        {
            var qs='tab='+tabName;
//            document.cookie = "tab_name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
//            document.cookie = "tab_name="+tabName+"; expires= 9999999999; path=/";
            $scope.openWin('form_setup',qs);
        }
        
        $scope.setHtmlAsVal=function(idx)
        {
            $scope.frmItm=JSON.parse(document.getElementById(idx).innerHTML);
            $log.log($scope.frmItm);
        }
        
        $scope.showFormX=function()
        {
            $log.log('called');
        }
        
        $scope.eleSetup=function(ind)
        {
            $scope.formSetup=$scope.frmItm[ind];
            $scope.frmStpInd=ind;
            if(!angular.isDefined($scope.formSetup.conf))
            {
                $scope.formSetup.conf=[];
                $scope.formSetup.conf.is_auto='False';
            }
            $scope.genFet('othTabsAll',$scope.tableShow.tab,'=','');
            $scope.temp.frm.pre_show='';
            $scope.temp.frm.pre_store=''; 
            $scope.openWinInner('forms','');
        }
        
        $scope.saveSesDta=function()
        {
            $scope.frmItm[$scope.frmStpInd]=$scope.formSetup;
//            $scope.params =
//            {
//                "con": "save_frm_builder_dta",
//                "x1":$scope.frmItm
//            };
//            $http({
//            method:'post',
//            url:$scope.url,
//            data:$scope.params,
//            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
//            }).then(function(reslt){
                $log.log('Form Builder data saved.');
                $log.log( $scope.frmItm);
//            });
            $scope.closeWinInner();
        }
        
        $scope.showSampleForm=function(frm)
        {
//            $scope.formSetup=$scope.frmItm;
//            if(!angular.isDefined($scope.formSetup.conf))
//            {
//                $scope.formSetup.conf={};
//                $scope.formSetup.conf.is_auto='False';
//            }
////            $scope.genFet('othTabsAll',$scope.tableShow.tab,'=','');
            $scope.params =
            {
                "con": "buildForm",
                "x1":$scope.frmItm,
                'x2':frm
            };
            $http({
            method:'post',
            url: $scope.url,
            data: $scope.params,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function(reslt){
                $log.log('Test Form Ret');
                $log.log($scope.frmItm);
                $log.log(reslt);
                $scope.openWinInner('testForm','tab='+frm+'&tst='+Math.random());
            });
//            $scope.closeWinInner();
            
        }
        
        $scope.preStoreVal=function(pre_show,pre_store)
        {
            $log.log($scope.formSetup);
            $scope.formSetup.conf.sel.sv.push({'str':pre_show,'vlu':pre_store});
        }
        
        /*
         * 
         * @return {undefined}
         * this is only to put in editor for form creation
         * 
         * 
         */
        
        $scope.chkEm=function(tabx,colx,qtxt,tcol)
        {
            if(angular.isDefined($scope.emCh))
            {
                $scope.emCh[tcol]=0;
            }
            else
            {
                $scope.emCh={};
                $scope.emCh[tcol]=0;
            }
            angular.forEach($scope.tableDta[tabx], function (value1)
            {
                if(value1[colx]==$scope.qtxt)
                {
                    $scope.emCh[tcol]=1;
                }
            });
        }
        
        /*
         * 
         * @return {undefined}
         * this is only to put in editor for form creation
         * 
         * 
         */
        
        $scope.toggleFR=function(indx)
        {
            $log.log(indx);
            if($scope.frmItm[indx].conf.frm_req==1)
            {
                $scope.frmItm[indx].conf.frm_req=0;
            }
            else
            {
                $scope.frmItm[indx].conf.frm_req=1;
            }
        }
        
        $scope.files = [];
        $scope.$on("seletedFilePost", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.uploadImagePost();
            });
        });
        $scope.uploadImagePost = function ()
        {
            var x1 = "";
            $http({
                method: 'POST',
                url: $scope.dLvl + "scripts/uploadFile.php",
                headers: {'Content-Type': undefined},
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("model", angular.toJson(data.model));
                    for (var i = 0; i < data.files.length; i++) {
                        formData.append("file" + i, data.files[i]);
                    }
                    return formData;
                },
                data: {model: x1, files: $scope.files}
            }).then(function (data) {
                $log.log(data);
                $scope.temp_img = atob(data.data.img_loc);
                $scope.imgPost=$scope.temp_img; 
            });
            $scope.files = [];
        };
        
        function getCK()
        {
            console.log('found');
                    if(document.getElementById('vnm')){
                        CKEDITOR.replace('vnm');}
                    if(document.getElementById('about_com')){
                        CKEDITOR.replace('about_com');}
                    if(document.getElementById('chmain')){
                        CKEDITOR.replace('chmain');}
                    if(document.getElementById('chdet')){
                        CKEDITOR.replace('chdet');}
                    if(document.getElementById('set2')){
                        CKEDITOR.replace('set2');}
                    if(document.getElementById('set1')){
                        CKEDITOR.replace('set1');}
                    if(document.getElementById('galCons')){
                        CKEDITOR.replace('galCons');}
                    if(document.getElementById('enqCons')){
                        CKEDITOR.replace('enqCons');}
                    if(document.getElementById('conMCons')){
                        CKEDITOR.replace('conMCons');}
                    if(document.getElementById('conDCons')){
                        CKEDITOR.replace('conDCons');}
                    if(document.getElementById('eveld')){
                        CKEDITOR.replace('eveld');}
                    if(document.getElementById('conQFCons')){
                        CKEDITOR.replace('conQFCons');}
                    if(document.getElementById('conConsCon')){
                        CKEDITOR.replace('conConsCon');}
                    if(document.getElementById('storiesCons')){
                        CKEDITOR.replace('storiesCons');}
                    if(document.getElementById('about_team')){
                        CKEDITOR.replace('about_team');}
                    if(document.getElementById('vnmap')){
                        CKEDITOR.replace('vnmap');
                        console.log('vnmap');}
                    if(document.getElementById('abtCom')){
                        CKEDITOR.replace('abtCom');
                        console.log('abtCom');}
                    if(document.getElementById('dirDesc'))
                    {
                        console.log('dirdesc');
                        CKEDITOR.replace('dirDesc');
                    }
                    if(document.getElementById('bnr_desc')){
                        CKEDITOR.replace('bnr_desc');}
        }
        $scope.postAbout=function(typeP,id,val)
        {
//            $log.log(typeP);
//            $log.log(id);
//            $log.log(val);
            if(typeP=='about_video')
            {
                $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'');
            }
            else if(typeP=='social')
            {
                $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'');
            }
            else
            {
                val.con_val=CKEDITOR.instances[typeP].getData();
                $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'');
            }
        };
        
    }]);
appAll.service('adminService', ['$http', function ($http) {
        this.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i < max; i += step) {
                input.push(i);
            }
            return input;
        };

        this.getPager = function (totalItems, currentPage, pageSize) {
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

//appAll.controller("AppCtrl", function ($rootScope) {
//  $rootScope.$on("$routeChangeStart", 
//                 function (event, current, previous, rejection) {
//    console.log($scope, $rootScope, $route, $location);
//  }); 

appAll.run( function (ngMeta,$rootScope) {
        ngMeta.init();
        $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
            console.log("$stateChangeStart " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
          });
          $rootScope.$on('$stateChangeSuccess', function() {
            console.log("$stateChangeSuccess " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
          });
          $rootScope.$on('$stateChangeError', function() {
            console.log("$stateChangeError " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
          });
    });
//appAll.run(function (ngMeta,$rootScope, $location,$route, $timeout) {
//    ngMeta.init();
//    $rootScope.config = {};
//    $rootScope.config.app_url = $location.url();
//    $rootScope.config.app_path = $location.path();
//    $rootScope.layout = {};
//    $rootScope.layout.loading = false;
//
//    $rootScope.$on('$routeChangeStart', function () {
//        console.log('$routeChangeStart');
//        //show loading gif
//        $timeout(function(){
//          $rootScope.layout.loading = true;          
//        });
//    });
//    $rootScope.$on('$routeChangeSuccess', function () {
//        console.log('$routeChangeSuccess');
//        //hide loading gif
//        $timeout(function(){
//          $rootScope.layout.loading = false;
//        }, 200);
//    });
//    $rootScope.$on('$routeChangeError', function () {
//
//        //hide loading gif
//        alert('wtff');
//        $rootScope.layout.loading = false;
//
//    });
//});

appAll.config(['$stateProvider', '$locationProvider', 'ngMetaProvider', function ($stateProvider, $locationProvider, ngMetaProvider)
    {
        
        var doc_panel = {
            name: 'doc_panel',
            url: '/',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/doctors_panel.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        }
        var doc_panel_dash = {
            name: 'doc_panel_dash',
            url: '/dashboard',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/doc_dashboard.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        }
        var categories = {
            name: 'categories',
            url: '/categories',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/categories.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        
        var post_image = {
            name: 'post_image',
            url: '/post_image',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/post_image.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        
        var post_video = {
            name: 'post_video',
            url: '/post_video',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/post_video.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        var posts = {
            name: 'posts',
            url: '/posts',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/posts.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        var comments = {
            name: 'comments',
            url: '/comments',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/comments.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        comments
        var about_us = {
            name: 'about_us',
            url: '/about_us',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/about_us.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        var contact = {
            name: 'contact',
            url: '/contact',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/contact.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        var logout = {
            name: 'logout',
            url: '/logout',
//            templateUrl: 'test/pages/astrology.php',
            templateUrl: 'pages/logout.php',
            controller: function ($stateParams) {
                var self = this;
                self.id = $stateParams.param1;
                self.qStrName = $stateParams.param2;
            },
            controllerAs: 'ctrl'
        };
        
        $stateProvider.state(doc_panel);    
        $stateProvider.state(doc_panel_dash);
        $stateProvider.state(categories); 
        $stateProvider.state(post_image);  
        $stateProvider.state(post_video); 
        $stateProvider.state(posts);  
        $stateProvider.state(comments);  
        $stateProvider.state(about_us);      
        $stateProvider.state(contact);      
        $stateProvider.state(logout);        
        $locationProvider.html5Mode(true);

    }]
        );

appAll.filter('languFilter', function () {
    return function (val, lang) {
        var out = '';
        var hi = [{"HOME": "घर"}, {"ASTROLOGY": "ज्योतिष"}, {"NUMEROLOGY": "अंकज्योतिष"}, {"MY GURU": "मेरा गुरु"}, {"MY DHARMA": "मेरा धर्म"}, {"FESTIVALS": "त्योहारों"}, {"PANCHANG": "पंचांग"}, {"VIDEOS": "वीडियो"}, {"BLOGS": "ब्लॉग"}, {"LOG IN": "लॉग इन करें"}, {"Today's Forecast": "आज के पूर्वानुमान"}, {"Recommended for You": "आपके लिए अनुशंसित"}, {"Today's Panchang": "आज का पंचांग"}, {"Aries": "मेष"}, {"aquarius": "कुंभ राशि"}, {"Pisces": "मीन राशि"}, {"Capricornus": "मकर"}, {"Taurus": "वृषभ"}, {"Gemini": "मिथुन राशि"}, {"Virgo": "कन्या"}, {"Libra": "तुला"}, {"Cancer": "कैंसर"}, {"Leo": "लियो"}, {"Scorpius": "स्कॉर्पियस"}, {"Sagittarius": "धनु"}, {"Astrology Quick Access": "ज्योतिष त्वरित पहुंच"}, {"Puja Quick Access": "पूजा त्वरित पहुंच"}, {"Guru Quick Access": "गुरु त्वरित पहुंच"}, {"Family Business Report": "पारिवारिक व्यवसाय रिपोर्ट"}, {"New Born Report": "नई जन्म रिपोर्ट"}, {"Startup Report": "स्टार्टअप रिपोर्ट"}, {"Factory Report": "फैक्टरी रिपोर्ट"}, {"Meetings & Travel": "बैठकें और यात्रा"}, {"know more": "अधिक जानिए"}, {"Astro Locator": "एस्ट्रो लोकेटर"}, {"Temple Locator": "मंदिर लोकेटर"}, {"Ashram Locator": "आश्रम लोकेटर"}, {"Gemstore Locator": "रत्न गैलरी लोकेटर"}, {"Show": "दिखाना"}, {"LOGIN": "लॉग इन करें"}, {"finance": "वित्त"}, {"WORK": "काम"}, {"CAREER": "कैरियर"}, {"PROPERTY": "संपत्ति"}, {"PARTNERSHIP": "साझेदारी"}, {"MARRIAGE": "शादी"}, {"FAMILY": "परिवार"}, {"CHILDREN": "परिवार"}, {"HELTH": "स्वास्थ्य"}, {"TRAVEL": "यात्रा"}, {"SHOW DETAILS": "प्रदर्शन का विवरण"}, {"Upcoming puja": "आगामी पूजा"}, {"Ganesh Puja": "गणेश पूजा"}, {"Laxmi Puja": "लक्ष्मी पूजा"}, {"Saraswati Puja": "सरस्वती पूजा"}, {"Basanti Puja": "बसंत पूजा"}, {"Festival puja": "महोत्सव पूजा"}, {"Durga Puja": "दुर्गा पूजा"}, {"Biswakarma Puja": "विश्वकर्मा पूजा"}, {"Annya Puja": "अन्न पूजा"}, {"GRAH PUJA": "ग्रेह पुजा"}, {"Manasa Puja": "मनसा पूजा"}, {"Shakti Puja": "शक्ति पूजा"}, {"MARRIAGE PUJA": "शादी पुजा"}, {"Kali Puja": "काली पूजा"}, {"NAVRATRI PUJA": "नववरात्री पुजा"}, {"BLACK MAGIC": "काला जादू"}, {"PERSONAL PUJA": "व्यक्तिगत पुजा"}, {"SINDUR PUJA": "सिंडुर पुजा"}, {"NAZAR PUJA": "नाज़र पुजा"}, {"CORPORATE PUJA": "कॉरपोरेट पुजा"}, {"ANTIM PUJA": "एंटीम पुजा"}, {"Sunrise": "सूर्योदय"}, {"Sunset": "सूर्य का अस्त होना"}, {"Moonrise": "चंद्रमा"}, {"Moonset": "चंद्रमा"}, {"Sun Sign": "कुण्डली"}, {"Moon Sign": "राशि"}, {"Ritu": "रितु"}, {"Ayana": "अयाना"}, {"Inauspicious Period": "अशुभ अवधि"}, {"Lunar Month": "चंद्र मास"}, {"Tithi": "तिथी"}, {"Yog": "योग"}, {"Nakshatra": "नक्षत्रा"}, {"Karan": "करन"}, {"Abhijit Muhurta": "अभिजीत मुहूर्ता"}, {"Shaka Samvat": "शक संवत"}, {"Vikram Samvat": "विक्रम संवत"}, {"Port Blair": "पोर्ट ब्लेयर"}, {"Adilabad": "आदिलाबाद"}, {"Adoni": "अदोनी"}, {"Alwal": "आलवाल"}, {"Anakapalle": "अनकापल्ले"}, {"Anantapur": "अनंतपुर"}, {"Bapatla": "बापतला"}, {"Belampali": "बेलम्पाली"}, {"Bhimavaram": "भीमवरम"}, {"Bhongir": "भोंगिर"}, {"Bobbili": "बोब्बिली"}, {"Bodhan": "बोधन"}, {"Chilakalurupet": "चिलकलुरुपेट"}, {"Chinna Chawk": "चिन्ना चाक"}, {"Chirala": "चिराला"}, {"Chittur": "चित्तूर"}, {"Cuddapah": "कडप्पा"}, {"Dharmavaram": "धर्मावरम"}, {"Dhone": "धोने"}, {"Eluru": "एलुरु"}, {"Gaddiannaram": "गद्दीनाराम"}, {"Gadwal": "गडवाल"}, {"Gajuwaka": "गजुवाका"}, {"Gudivada": "गुडिवाडा"}, {"Gudur": "गुडुर"}, {"Guntakal": "गुंटकाल"}, {"Guntur": "गुंटूर"}, {"Hindupur": "हिन्दुपुर"}, {"Hyderabad": "हैदराबाद"}, {"Kadiri": "कादिरी"}, {"Kagaznagar": "कागाजनगर"}, {"Kakinada": "काकीनाडा"}, {"Kallur": "कल्लूर"}, {"Kamareddi": "कामरेड्डी"}, {"Kapra": "कपरा"}, {"Karimnagar": "करीमनगर"}, {"Karnul": "करनाल"}, {"Kavali": "कवली"}, {"Khammam": "खम्मम"}, {"Kodar": "कोदर"}, {"Kondukur": "कोंडुकुर"}, {"Koratla": "कोराताला"}, {"Kottagudem": "कोट्टागुडेम"}, {"Kukatpalle": "कुक्कटपल्ली"}, {"Lalbahadur Nagar": "लालबाहदुर नगर"}, {"Machilipatnam": "मछलीलीपट्टनम"}, {"Mahbubnagar": "महबूबनगर"}, {"Malkajgiri": "मलकजगिरी"}, {"Mancheral": "मंचेरल"}, {"Mandamarri": "मंडमार्री"}, {"Mangalagiri": "मंगलागिरी"}, {"Markapur": "मार्कपुर"}, {"Miryalaguda": "मिरियालागुडा"}, {"Nalgonda": "नालगोंडा"}, {"Nandyal": "नंदील"}, {"Narasapur": "नरसपुर"}, {"Narasaraopet": "नरसरावपेट"}, {"Nellur": "नेल्लोर"}, {"Nirmal": "निर्मल"}, {"Nizamabad": "निजामाबाद"}, {"Nuzvid": "नजविद"}, {"Ongole": "ओंगोल"}, {"Palakollu": "पालकोल्लू"}, {"Palasa": "पलासा"}, {"Palwancha": "पलवांचा"}, {"Patancheru": "पैटेंशेरु"}, {"Piduguralla": "पीगुगुल्लला"}, {"Ponnur": "पोन्नूर"}, {"Proddatur": "प्रोड्डेट"}, {"Qutubullapur": "कुतुबुल्लापुर"}, {"Rajamahendri": "राजमहन्दी"}, {"Rajampet": "राजपेट"}, {"Rajendranagar": "राजेंद्रनगर"}, {"Ramachandrapuram": "रामचंद्रपुराम"}, {"Ramagundam": "रामगुंडम"}, {"Rayachoti": "रायचोटी"}, {"Rayadrug": "रायड्रग"}, {"Samalkot": "समालकोट"}, {"Sangareddi": "संगारेड्डी"}, {"Sattenapalle": "सटेनापल्ले"}, {"Serilungampalle": "सेरिलिंगमपल्ली"}, {"Siddipet": "सिद्धिपेट"}, {"Sikandarabad": "सिकंदराबाद"}, {"Sirsilla": "सिरसिला"}, {"Srikakulam": "श्रीकाकुलम"}, {"Srikalahasti": "श्रीकालहस्ती"}, {"Suriapet": "सूरीपेट"}, {"Tadepalle": "ताडेपल्ले"}, {"Tadepallegudem": "ताडेपल्लेग्यूडेम"}, {"Tadpatri": "ताड़पत्री"}, {"Tandur": "तंदूर"}, {"Tanuku": "तनुकू"}, {"Tenali": "तेनाली"}, {"Tirupati": "तिरुपति"}, {"Tuni": "तुनी"}, {"Uppal Kalan": "उप्पल कलान"}, {"Vijayawada": "विजयवाड़ा"}, {"Vinukonda": "विनुकोंडा"}, {"Visakhapatnam": "विशाखापत्तनम"}, {"Vizianagaram": "विजयनगरम"}, {"Vuyyuru": "वूयुरु"}, {"Wanparti": "वानपार्टी"}, {"Warangal": "वारंगल"}, {"Yemmiganur": "यममिगनुर"}, {"Itanagar": "इटानगर"}, {"Barpeta": "बारपेटा"}, {"Bongaigaon": "बोंगाईगांव"}, {"Dhuburi": "धुबरी"}, {"Dibrugarh": "डिब्रूगढ़"}, {"Diphu": "दिफू"}, {"Guwahati": "गुवाहाटी"}, {"Jorhat": "जोरहाट"}, {"Karimganj": "करीमगंज"}, {"Lakhimpur": "लखीमपुर"}, {"Lanka": "लंका"}, {"Nagaon": "नागाँव"}, {"Sibsagar": "सिबसागर"}, {"Silchar": "सिलचर"}, {"Tezpur": "तेज़पुर"}, {"Tinsukia": "तिनसुकिया"}, {"Alipur Duar": "अलीपुर द्वार"}, {"Arambagh": "अराबाग"}, {"Asansol": "आसनसोल"}, {"Ashoknagar Kalyangarh": "अशोकनगर कल्याणगढ़"}, {"Baharampur": "बहरामपुर"}, {"Baidyabati": "बैद्यबाटी"}, {"Baj Baj": "बज बज"}, {"Bally": "बाली"}, {"Bally Cantonment": "बाली छावनी"}, {"Balurghat": "बालूरघाट"}, {"Bangaon": "बंगाँ"}, {"Bankra": "बैंकरा"}, {"Bankura": "बंकूरा"}, {"Bansbaria": "बंसबारिया"}, {"Baranagar": "बारानगर"}, {"Barddhaman": "बर्धमान"}, {"Basirhat": "बसिरहाट"}, {"Bhadreswar": "भद्रेश्वर"}, {"Bhatpara": "भाटपाड़ा"}, {"Bidhannagar": "बिधाननगर"}, {"Binnaguri": "बिनागुरी"}, {"Bishnupur": "बिश्नुपुर"}, {"Bolpur": "बोलपुर"}, {"Kolkata": "कोलकाता"}, {"Chakdaha": "चकदाहा"}, {"Champdani": "चंपदानी"}, {"Chandannagar": "चंदननगर"}, {"Contai": "कॉन्टैई"}, {"Dabgram": "दग्राम"}, {"Darjiling": "दार्जिलिंग"}, {"Dhulian": "धुलियन"}, {"Dinhata": "दन्हाता"}, {"Dum Dum": "डम डम"}, {"Durgapur": "दुर्गापुर"}, {"Gangarampur": "गंगारामपुर"}, {"Garulia": "गरुलिया"}, {"Gayespur": "गायसपुर"}, {"Ghatal": "घाटल"}, {"Gopalpur": "गोपालपुर"}, {"Habra": "हाब्रा"}, {"Halisahar": "हल्सीहर"}, {"Haora": "हाउरा"}, {"HugliChunchura": "हुग्ली चंचुरा"}, {"Ingraj Bazar": "इंगraj बाजार"}, {"Islampur": "इस्लामपुर"}, {"Jalpaiguri": "जलपाईगुड़ी"}, {"Jamuria": "जमूरिया"}, {"Jangipur": "जंगीपुर"}, {"Jhargram": "झारग्राम"}, {"Kaliyaganj": "कालियागंज"}, {"Kalna": "कलना"}, {"Kalyani": "कल्याणी"}, {"Kamarhati": "कामभाटी"}, {"Kanchrapara": "कांचपारा"}, {"Kandi": "कंडी"}, {"Karsiyang": "कार्सियांग"}, {"Katwa": "कटवा"}, {"Kharagpur": "खड़गपुर"}, {"Kharagpur Railway Settlement": "खड़गपुर रेलवे सेटलमेंट"}, {"Khardaha": "खर्डहा"}, {"Kharia": "खरिया"}, {"Koch Bihar": "कोच बिहार"}, {"Konnagar": "कोनगर"}, {"Krishnanagar": "कृष्णनगर"}, {"Kulti": "कुल्टी"}, {"Madhyamgram": "मध्यमग्राम"}, {"Maheshtala": "महेश्टल"}, {"Memari": "मेमारी"}, {"Midnapur": "मिदनापुर"}, {"Naihati": "नैहाती"}, {"Navadwip": "नवद्वीप"}, {"Ni Barakpur": "नी बैरकपुर"}, {"North Barakpur": "उत्तर बैरकपुर"}, {"North Dum Dum": "उत्तर डम डम"}, {"Old Maldah": "ओल्ड मालदा"}, {"Panihati": "पनिहती"}, {"Phulia": "फुुलिया"}, {"Pujali": "पुजली"}, {"Puruliya": "पुरुलिया"}, {"Raiganj": "रायगंज"}, {"Rajpur": "राजपुर"}, {"Rampur Hat": "रामपुर टोट"}, {"Ranaghat": "रानाघाट"}, {"Raniganj": "रानीगंज"}, {"Rishra": "ऋष्रा"}, {"Shantipur": "शांतिपुर"}, {"Shiliguri": "सिलीगुड़ी"}, {"Shrirampur": "श्रीरामपुर"}, {"Siuri": "सिउरी"}, {"South Dum Dum": "दक्षिण डम डम"}, {"Titagarh": "टिटगढ़"}, {"Ulubaria": "उलुबेरिया"}, {"UttarparaKotrung": "उत्तरपाराकोट्रांग"}, {"Araria": "अररिया"}, {"Arrah": "अराह"}, {"Aurangabad": "औरंगाबाद"}, {"Bagaha": "बगहा"}, {"Begusarai": "बेगुसाराय"}, {"Bettiah": "बेटियाह"}, {"Bhabua": "भाबुआ"}, {"Bhagalpur": "भागलपुर"}, {"Bihar": "Bihar"}, {"Buxar": "बक्सर"}, {"Chhapra": "छपरा"}, {"Darbhanga": "दरभंगा"}, {"Dehri": "देहरी"}, {"DighaMainpura": "दीघा मैनपुरा"}, {"Dinapur": "दीनापुर"}, {"Dumraon": "Dumraon"}, {"Gaya": "गया"}, {"Gopalganj": "गोपालगंज"}, {"Goura": "गौरा"}, {"Hajipur": "हाजीपुर"}, {"Jahanabad": "जहानाबाद"}, {"Jamalpur": "जमालपुर"}, {"Jamui": "जामूई"}, {"Katihar": "कटिहार"}, {"Khagaria": "खगरिया"}, {"Khagaul": "खगौल"}, {"Kishanganj": "किशनगंज"}, {"Lakhisarai": "लखिसराई"}, {"Madhipura": "मधेपुरा"}, {"Madhubani": "मधुबनी"}, {"Masaurhi": "Masaurhi"}, {"Mokama": "मोकामा"}, {"Motihari": "मोतीहारी"}, {"Munger": "मुंगेर"}, {"Muzaffarpur": "मुजफ्फरपुर"}, {"Show Chaugadhia Muhurta": "चौधिया मुहूर्ता को दिखाएं"}, {"Show Hora Muhurta": "होरा मुहूर्ता दिखाएँ"}, {"Show Planetary Positions": "ग्रहों की स्थिति दिखाएं"}, {"Chaughadiya Name": "चोगडिया नाम"}, {"Time": "पहर"}, {"My Doshas": "मेरा दोष"}, {"My Yogas": "मेरे योग"}, {"Match Making": "मिलान बनाना"}, {"My planets": "मेरे ग्रह"}, {"General Nature": "सामान्य प्रकृति"}, {"New in Stores": "स्टोर में नया"}, {"Dresses": "कपड़े"}, {"Tops": "सबसे ऊपर है"}, {"Jackets": "जैकेट"}, {"Pants": "पैंट"}, {"Accessories": "सहायक उपकरण"}, {"Newsletter": "न्यूज़लैटर"}, {"Add To Wishlist": "इच्छा सूचि में डालें"}, {"View Post": "पोस्ट देखें"}, {"Leave a reply": "उत्तर छोड़ दें"}, {"Go Back To Blog": "ब्लॉग पर वापस जाएं"}, {"Name": "नाम"}, {"Email": "ईमेल"}, {"Contact no": "संपर्क नंबर"}, {"Comment": "टिप्पणी"}, {"I'm not a robot": "में रोबोट नहीं हूँ"}, {"Submit": "जमा करें"}, {"Login Please": "लॉग इन करें कृपया"}, {"Show Panchang": "पंचांग दिखाएँ"}, {"Exclusive Services": "विशेष सेवाएँ"}, {"Festivals Calender": "त्योहार कैलेंडर"}, {"Profiles": "प्रोफाइल"}, {"Invoices": "चालान"}, {"Forecast": "चालान"}, {"Your Preferred Language": "आपकी पसंदीदा भाषा"}];
//            var out = [];
//            alert(lang);
//            
//            return lang;
        if (lang == 'en')
        {
            return val;
        }
        if (lang == '')
        {
            var lang = getCookie('language');
            if (lang != '')
            {
                if (lang == 'hi')
                {
                    angular.forEach(hi, function (value, key)
                    {
                        angular.forEach(value, function (v1, key1)
                        {
                            if (key1.toString() == val)
                            {
                                out = v1;
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
            if (lang == 'hi')
            {
                angular.forEach(hi, function (value, key)
                {
                    angular.forEach(value, function (v1, key1)
                    {
                        if (key1.toString() == val)
                        {
                            out = v1;
                        }
                    });
                });
            }
        }
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
                    scope.$emit("seletedFile", {file: files[i]});
                }
            });
        }
    };
});
appAll.directive('uploadFilesGal', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFilePost", {file: files[i]});
                }
            });
        }
    };
});

appAll.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    }
});

appAll.filter('titleCase', function () {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
})


appAll.filter('autoComp', function(){
    return function(datasource, val){
        var out = [];
//        console.log('fil called');
//        console.log(val); 
        var i=0,j=0;
        var xx1=[];
        angular.forEach(datasource, function(record){
            var valxx1=record.m_name;
            valxx1=valxx1.toUpperCase();
            var valxx2=val.toUpperCase();
            if(valxx1.indexOf(valxx2)>=0)
            {
                out.push(record);
            }
        });
        return out;
    }
});
