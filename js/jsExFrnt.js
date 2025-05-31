var appAll = angular.module('appAll', ['angularUtils.directives.dirPagination', 'ngMaterial', "ui.bootstrap.modal", 'ui.router', 'ngMeta', 'ADM-dateTimePicker', 'ui.bootstrap', 'mwl.calendar','ui.calendar']);


appAll.controller('mainController', ['$scope', '$http', '$log', '$filter', 'adminService', '$window', '$sce', 'ngMeta', '$stateParams', '$rootScope', '$location', '$timeout', '$q', 'calendarConfig', '$interval','$mdColorPalette','$mdSidenav','$mdDialog', function ($scope, $http, $log, $filter, adminService, $window, $sce, ngMeta, $stateParams, $rootScope, $location, $timeout, $q, calendarConfig, $interval,$mdColorPalette,$mdSidenav,$mdDialog)
    {
        $log.log("Started ::::::");
        var vm = this;
        var self = this;
        self.activated = true;
        self.determinateValue = 0;
        this.settings = {
            printLayout: true,
            showRuler: true,
            showSpellingSuggestions: true,
            presentationMode: 'edit'
        };
        $scope.temp=[];
        $scope.crtAlbUP={};
        $scope.activated = true;
        $scope.determinateValue = 0;
        
        $scope.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
          return function() {
            $mdSidenav(componentId).toggle();
          };
        }

        $log.log($mdColorPalette);
        $scope.defineVars = function ()
        {
//            alert('loaded');
            $scope.selected = [1];
            $scope.showHead == 0;
            $scope.Math = window.Math;
            $scope.lang = 'en';
//            $scope.user = uid;
            $scope.userLogged = '';
            $scope.currentPage = 0;
            $scope.pageSize = 9;
//xx            $scope.url = 'account/scripts/qfinder.php';
//xx            $scope.dLvl = "account/";
            $scope.url = 'bhajohariranna.com/scripts/qfinder.php';
            $scope.dLvl = "bhajohariranna.com/";
            $scope.modalWin = 'false';
            $scope.oneAtATime = true;
            $scope.status = {
                isCustomHeaderOpen: false,
                isFirstOpen: true,
                isFirstDisabled: false
            };
            $scope.showLog = 0;
            $scope.defineVarsCalls();   
            $scope.dirD="https://sabjantaa.com/bhajohariranna.com/";
            var imagePath="https://sabjantaa.com/bhajohariranna.com/"+$scope.dLvl+"images/pc_icon/ir.png";
//xx            $scope.fileMPath="forms/blank.php";
            $scope.fileMPath="bhajohariranna.com/forms/blank.php";
            $scope.cls=[];
//            $scope.todos = [
//                {
//                    face: imagePath,
//                    what: 'XXX',
//                    who: 'ooooooooo',
//                    when: '3:08PM',
//                    notes: " XXXXXXXXXXXXXX"
//                },
//                {
//                    face: imagePath,
//                    what: 'XXX',
//                    who: 'ooooooooo',
//                    when: '3:08PM',
//                    notes: " XXXXXXXXXXXXXX"
//                },
//                {
//                    face: imagePath,
//                    what: 'XXX',
//                    who: 'ooooooooo',
//                    when: '3:08PM',
//                    notes: " XXXXXXXXXXXXXX"
//                },
//                {
//                    face: imagePath,
//                    what: 'XXX',
//                    who: 'ooooooooo',
//                    when: '3:08PM',
//                    notes: " XXXXXXXXXXXXXX"
//                },
//                {
//                    face: imagePath,
//                    what: 'XXX',
//                    who: 'ooooooooo',
//                    when: '3:08PM',
//                    notes: " XXXXXXXXXXXXXX"
//                }
//            ];
//            $scope.days = ["Monday","Tuesday","Wednessday","Thursday","Friday","Saturday","Sunday"];
            $scope.allServs=[];
            
            
        };
        
        
        $scope.temp = {};        
        $scope.defineVarsCalls = function ()
        {
            $scope.params = {
                "con": 'base_fetch'
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
                $scope.courseType=["General","Educational","Prefessional","Extra Caricullar","Current Affaires"];
                $scope.itmDays=["Sunday","Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"];
                $scope.body_class="";
                $scope.feesArr=["All","Paid","Pending"];
                $scope.isNavCollapsed=true;
                $scope.yesNo=["yes","no"];
                $scope.compleXity=["Beginner","Modarate","Intermediate","Advance"];
                $scope.allBoards=["Playgroup","nursury","POLYTECHNIC","MASTERS"];
                $scope.allSujects=["Scrience","Biology","Zoology","Bengali","English","Hindi","Botani","Mathematics","Physics","Commerce"];
                
//                $scope.allClasses=data.classes;
//                $scope.allCourses=data.courses;
//                $scope.allTuto=data.tuto;
//                $scope.allBatches=data.batches;
//                $scope.allBatches=data.batches;
//                $scope.allSes=data.season_det;
                $scope.userDet=data;
//                $scope.allQues=data.questions;
                $log.log(data);
                
            });
        };
        
        
        $scope.defineVars();
//        $scope.otp;
        $scope.setUID = function (uid)
        {
            $scope.user = uid;
//            alert();
        };
//        $scope.closeWin=function()
//        {
//            $scope.filePath=$scope.dLvl+'blank.php';
//        }
//        $scope.openWin=function(val,loc)
//        {
////            alCert();
//            $scope.filePath=$scope.dLvl+'includes/windows/win_'+loc+'.php';
//        }
//        
    $scope.initDA=function()
    {
        alert();
    }

        $scope.showConfirm = function (ev) {
            $scope.tempUrl=$scope.dLvl+'pages/diadAddress.php'
            $mdDialog.show({
                controller: DialogController,
                templateUrl: $scope.tempUrl,
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application to prevent interaction outside of dialog
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: false // Only for -xs, -sm breakpoints.
            }).then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
            
            
    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
          $mdDialog.hide();
        };

        $scope.cancel = function () {
          $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
          $mdDialog.hide(answer);
        };
    }
    
//            var confirm = $mdDialog.confirm()
//                    .title('Would you like to delete your debt?')
//                    .textContent('All of the banks have agreed to forgive you your debts.')
//                    .ariaLabel('Lucky day')
//                    .targetEvent(ev)
//                    .ok('Please do it!')
//                    .cancel('Sounds like a scam');
//
//            $mdDialog.show(confirm).then(function () {
//                $scope.status = 'You decided to get rid of your debt.';
//            }, function () {
//                $scope.status = 'You decided to keep your debt.';
//            });
        };
        
        $scope.hide = function () {
            $mdDialog.hide();
          };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };

        /* INIT PAGES*/
/* up forms **/

$scope.upform_cls=function(itm)
{
    $scope.cls.selCls="update";
    $scope.cls.updata=itm;
    if($scope.cls.updata.cls_subjects!='null')
    {
        $scope.cls.updata.cls_subjects=splitIt($scope.cls.updata.cls_subjects);
    }
    $log.log($scope.cls);
    focusOn("up_class");
//    $window.scrollTo(0, 0);
};

/* upp forms **/


        $scope.initIndexPage = function ()
        {
//            alert('Called');
            $scope.showHead = 1;
            document.getElementById("xxxx2").style.display = "none";
            $scope.pageOn='home';
            callingSlick();

        }

        
function callingSlick()
{
        setTimeout(function(){
           $('#menu-items').slick({
            slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,

                dots: true,
                infinite: true,
                responsive: [

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 581,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 361,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            }); 
    $('#testimonial-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,

                    dots: true,
                    infinite: true,
                    responsive: [

                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                      }
                    },
                    {
                      breakpoint: 991,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 769,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    },            
                    {
                      breakpoint: 581,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 361,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }            
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                    ]
                    });   
        }, 1000);
}

        $scope.initAboutPage = function ()
        {
//            alert('Called');
            $scope.showHead = 1;
            $scope.pageOn='about';
            document.getElementById("xxxx2").style.display = "none";
            $scope.loggedCheck();
//            callingSlick();

        }
        $scope.initMenuPage = function (xi)
        {
            
            $scope.par1=$stateParams.param1;            
            $scope.showHead = 1;
            $scope.pageOn='menu';
            document.getElementById("xxxx2").style.display = "none";
            $scope.loggedCheck();
            if(angular.isDefined($scope.par1))
            {
//                console.log('hree1');
                $scope.genFet('itemsX','url','=',$scope.par1);
                callingSlick();
            }
            else
            {
//                console.log('hree2');
                $scope.genFet('items','','','');
                callingSlick();
            }
        }
        $scope.initContactPage = function ()
        {
//            alert('Called');
            $scope.showHead = 1;
            $scope.pageOn='contact';
            document.getElementById("xxxx2").style.display = "none";
            $scope.loggedCheck();
            
//            callingSlick();

        }
        $scope.initOffersPage = function ()
        {
//            alert('Called');
            $scope.showHead = 1;
            $scope.pageOn='offers';
            document.getElementById("xxxx2").style.display = "none";
            $scope.loggedCheck();
//            callingSlick();

        }
        $scope.initDashboard = function ()
        {
            document.getElementById("xxxx2").style.display = "none";
            $scope.showHead = 1;
            $scope.currentNavItem = 'profile';
            $scope.pageOn='dashboard';
            $scope.loggedCheck();
        }
        $scope.initLoginPage = function()
        {
            document.getElementById("xxxx2").style.display = "none";
            $scope.showHead = 1;
            $scope.pageOn='login';
            $scope.currentNavItem = 'login';
            $scope.loggedCheck();
        }
        $scope.initValidatePage=function()
        {
            if($stateParams.param1!=null)
            {
//                $log.log('$stateParams.param1');
                $scope.par1=$stateParams.param1;
                $log.log(atob($scope.par1));
                $scope.getVerified($scope.par1);
//                $log.log($stateParams.param1);
            }
            else
            {
//                $log.log('$stateParams.param1XX');
            }
            $scope.loggedCheck();
            
        }
        $scope.initCartPage = function()
        {
//            alert();
            document.getElementById("xxxx2").style.display = "none";
            $scope.showHead = 1;
            $scope.pageOn='cart';
            $scope.currentNavItem = 'cart';
            $scope.loggedCheck();
            $scope.genFet('cart','','','');
        }  
        $scope.initCheckout = function()
        {
//            alert();
            document.getElementById("xxxx2").style.display = "none";
            $scope.showHead = 1;
            $scope.pageOn='cart';
            $scope.currentNavItem = 'cart';
            $scope.loggedCheck();
            $scope.genFet('cart','','','');
        }        
 
        $scope.initCatsPage = function ()
        {
            document.getElementById("xxxx2").style.display = "none";
            $scope.getCategories('', 'true', 'all');
            $scope.pageOn='caategories';
            $scope.loggedCheck();
        };

        $scope.initProPage = function ()
        {
            $scope.showHead = 1;
            document.getElementById("xxxx2").style.display = "none";
            $scope.getCategories('', 'true', 'all');
            $scope.getAllProducts();
            $scope.getProStats();
            $scope.getDelDet();

        };
        
        $scope.initDashPage = function ()
        {
            $log.log('inside init');
            $scope.body_class="body_regC";
            $scope.showHead = 1;
            $scope.bnr=[];
            document.getElementById("xxxx2").style.display = "none";
            $scope.siteH1name="Dashboard";
            $scope.activated = !$scope.activated;
            alert();            
        }

        $scope.sct=function()
        {
            $scope.isNavCollapsed=true;
            $window.scrollTo(0, 0);
        };
        $scope.pageVarInit = function ()
        {
            $scope.getAllItems();
//            $scope.vm = {};
//            $scope.vm.pager = {};
//            $scope.vm.setPage = $scope.setPage;
        }


        $scope.getCategories = function (id, child, par)
        {

            $scope.params = {
                "con": 'get_cats',
                "id": id,
                "child": child,
                "par": par
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
                $log.log("categories");
                $log.log(data);
                $log.log("categories");
                $scope.allCats = data;
            });
        };
        
        $scope.getVerified = function (url)
        {

            $scope.params = {
                "con": 'get_verified',
                "id": atob(url)
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
//                $log.log("categories");
                $log.log(data);
//                $log.log("categories");
                if(data)
                {
                    if(confirm("Email Verified...Please Login"))
                    {    angular.isDefined($scope.userDet.name)
                        {
                            $scope.userDet.status='verified';
                            $location.path("/bhajohariranna.com/menu").replace().reload(false);
                        }
                        angular.isDefined(!$scope.userDet.name)
                        {

                            $location.path("/bhajohariranna.com/login").replace().reload(false);
                        }
                    }
                }
            });
        };


        $scope.getProducts = function (id, par)
        {
            $scope.params = {
                "con": 'get_prods',
                "id": id,
                "par": par
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
                $log.log("get_prods");
                $log.log(reslt);
                $log.log("get_prods");
                $scope.allProds = data;
            });
        };

        $scope.getAllProducts = function ()
        {
            $scope.params = {
                "con": 'getAllProducts'
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
                $log.log("get_prods");
                $log.log(data);
                $log.log("get_prods");
                $scope.allProds = data;
            });
        };
        $scope.getProStats = function ()
        {
            $scope.params = {
                "con": 'getProStats'
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
                $log.log("getProStats");
                $log.log(data);
                $log.log("getProStats");
                $scope.allProStats = data;
            });
        };

        $scope.getDelDet = function ()
        {
            $scope.params = {
                "con": 'getDelDet'
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
//                $log.log("getDelDet");
//                $log.log(data);
//                $log.log("getDelDet");
                $scope.allDelDet = data;
            });
        };

        $scope.showAD = function (id)
        {
            $scope.actVal = id;
            $scope.openWin(0, 'assign_del');
        }

        $scope.assisgnDelivery = function (sdd, ord)
        {
            $scope.params = {
                "con": 'assisgnDelivery',
                'sdd': sdd,
                'ord': ord
            };
            $http({
                method: 'post',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (reslt) {
                var data = reslt.data;
                $log.log("assisgnDelivery");
                $log.log(data);
                $log.log("assisgnDelivery");
                $scope.allDelDet = data.del;
                $scope.allProStats = data.pro;
            });
        }

        $scope.getDelName = function (xx)
        {
            if (angular.isDefined($scope.allDelDet))
            {
                angular.forEach($scope.allDelDet, function (value, key)
                {
                    if (value.sdd_id === xx)
                    {
                        $log.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                        return value.name;
                    }
                });
            } 
            else
            {
                return null;
            }
        };

        $scope.getChilds = function (items, field, valToCheck)
        {
            $scope.temp.itm = [];
            angular.forEach(items, function (value, key)
            {
                if (value[field] == valToCheck)
                {
                    $scope.temp.itm.push(value);
                }
            });
            $log.log($scope.temp.itm);
            return $scope.temp.itm;
        }

        $scope.getDStat = function ()
        {
            $scope.temp.itm = [];
            angular.forEach(items, function (value, key)
            {
                if (value[field] == valToCheck)
                {
                    $scope.temp.itm.push(value);
                }
            });
            $log.log($scope.temp.itm);
            return $scope.temp.itm;
        }

        $scope.getTotal=function(itemC)
        {
            
        }

        $scope.closeWin = function ()
        {
            $scope.fileMPath = $scope.dLvl + 'forms/blank.php';
        };
        $scope.openWin = function (val, loc)
        {
//            alCert();
            $scope.fileMPath = $scope.dLvl + 'forms/' + loc + '.php';
        };



        /* Init Pages */
        $scope.ifrmVid = function (url)
        {
            return($sce.trustAsResourceUrl(url));
        }

        var timer;
        var updateCounter = function () {
            $scope.counter--;
            if ($scope.counter <= 0)
            {
                $scope.conServChange('noanswer');
            } else
            {
                timer = $timeout(updateCounter, 1000);
            }
        };
        $scope.getNotifi = function ()
        {
            $scope.params =
                    {
                        "con": "get_notifi_user"
                    };
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (data) {
                data = data.data;
                if (data.length >= 1)
                {
                    $scope.noties = data;
                }
            });
        };
        /*****************
         * 
         * 2nd solution of product showing with pagination
         * 
         * 
         * END
         *********************/
        /* sol 3 */

        $scope.paginateSc = {};


        $scope.setPageNo3x = function (par, chi)
        {

            $scope.pn = Math.ceil(chi / $scope.pageSize);
            $scope.pnPage[par] = $scope.pn;
        }
        $scope.setPn3x = function (par)
        {
            $scope.pview = 0;
            $scope.paginateSc.itemcount = 0;
            $scope.paginateSc.itemcount2 = 0;
            angular.forEach($scope.cur_item[par].sub_fea, function (value, key)
            {
                if (value['fea_type'] == 'base')
                {
                    $scope.paginateSc.itemcount = $scope.paginateSc.itemcount + 1;
                }
            });
//            alert(par);
//            alert($scope.cur_item[par]);
            $log.log($scope.cur_item[par]);
            $log.log('$scope.cur_item[par]');
//            $scope.pnPage[par]=[];
        }

        $scope.get_pn3x = function (indexpn)
        {
            if ($scope.cur_item['sub_fea'][indexpn].fea_type == 'base')
            {
                if ($scope.paginateSc.itemcount2 <= $scope.paginateSc.itemcount)
                {
                    $scope.paginateSc.itemcount2 = $scope.paginateSc.itemcount2 + 1;
                    return Math.floor($scope.paginateSc.itemcount2 / $scope.pageSize);
                } else
                {
                    return 'x';
                }
//                  alert(Math.floor(indexpn/$scope.pageSize));                    
            } else
            {
                return 'x1';
            }
        }
        $scope.getNumber3x = function (par)
        {
            return Math.ceil(par / $scope.pageSize)
        };
        /* sol 3 */

        $scope.searchThis = function (valx)
        {
            var itmval = encodeURI(valx);
            $http({
                method: 'POST',
                url: $scope.url,
                data: {"con": 'search_this', 'itm': itmval},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                    .then(function (data) {
                        data = data.data;
                    });
        }
        $scope.changeTimeX = function (xT)
        {
            var ww = moment(xT, 'HH:mm:ss');
//            $log.log('passed'+xT);
            var xx = ww.subtract({'hours': 5, 'minutes': 12, 'seconds': 0}).format('hh:mm:ss');
            $log.log('Subbed' + xx);
//            $log.log('passed'+xT);
            return xx.toString();
        };
        $scope.loaderState = function (cal)
        {
            document.getElementById("xxxx2").style.display = "none";
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

        $scope.logCheck = function (logdt)  
        {
//            $log.log(logdt);
            $http({
                method: 'POST',
                url: $scope.url,
                data: {"con": 'logCheck', 'con_val': logdt},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                    .then(function (datax) {
                        var data = datax.data;
                        $log.log(data);
                        $log.log(logdt);
                        $scope.userDet=data;
                        if (angular.isDefined(data.logged))
                        {
                            if(data.status=='verify')
                            {
                                alert('Welcome '+data.name);
                                alert("Please Verify the mail");
                                $location.path("/bhajohariranna.com/verify").replace().reload(false);
                                $scope.cartCount=$scope.userDet.cartCount;
                            }
                            else
                            {
                                alert('Welcome '+data.name);
                                $location.path("/bhajohariranna.com/dashboard").replace().reload(false);
                                $scope.cartCount=$scope.userDet.cartCount;
                            }
//xx                            $location.path("/account/dashboard").replace().reload(false);
//                    window.location.href="https://sabjantaa.com/bhajohariranna.com/account/dashboard";
                        } 
                        else
                        {
                            alert('Some thing is not right');
                        }
                    });
        };
        $scope.logCheckR = function (logdt)  
        {
            if(logdt.user_pass==logdt.pass2)
            {
            $log.log(logdt);
                $http({
                    method: 'POST',
                    url: $scope.url,
                    data: {"con": 'logCheckR', 'con_val': logdt},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function (datax) {
                    var data = datax.data;
            $log.log('returned');
                        $log.log(data);
                    $scope.userDet=data;
                    if (angular.isDefined(data.logged))
                    {
                        alert("Please Verify the mail");
                        $location.path("/bhajohariranna.com/verify").replace().reload(false);
                        $scope.cartCount=$scope.userDet.cartCount;
                    } 
                    else if(angular.isDefined(data.error))
                    {
//                        alert(data.error);
                    }
                });
            }
        };
        $scope.loggedCheck = function ()
        {
            $http({
                method: 'POST',
                url: $scope.url,
                data: {"con": 'logCheck', 'con_val': ''},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function (datax) {
                $scope.userDet=datax.data;
                $scope.cartCount=$scope.userDet.cartCount;
            });
        }

        $scope.logout = function ()  
        {
//            $log.log(logdt);
$log.log('called');
            $http({
                method: 'POST',
                url: $scope.url,
                data: {"con": 'logOut'},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                    .then(function (datax) {
                        var data = datax.data;
                        $log.log('called2');
                        $log.log(data);
                        $scope.loggedCheck();$log.log('called4');
//                        if (data.stat=='success')
//                        {
//                            alert("You Have Been Logged Out...");
//                            $scope.loggedCheck();
//                        } else
//                        {
//                            
//                        }
                    });
        };

        /*    FILE UPLOADING      */
        $scope.files = [];
        $scope.$on("seletedFile", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.uploadImagex();
            });
        });
        $scope.uploadImagex = function ()
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
            });
            $scope.files = [];
        };


        /*          Flie Upload                */

        /* loader 2 */


        $interval(function () {

            $scope.determinateValue += 1;
            if ($scope.determinateValue > 100) {
                $scope.determinateValue = 0;
            }

            /* loader 2 */

        }, 100);

        /* details */


        $scope.resetFrm = function ()
        {
            $scope.curAwd = 0;
            $scope.curDex = 0;
            $scope.curEdu = 0;
            $scope.curExp = 0;
            $scope.curDm = 0;
            $scope.eduisnew = 'new';
            $scope.dexisnew = 'new';
            $scope.daisnew = 'new';
            $scope.dmisnew = 'new';
            $scope.edu = [];
            $scope.da = [];
            $scope.dex = [];
            $scope.dm = [];
            CKEDITOR.instances['edu_desc'].setData('');
            CKEDITOR.instances['dex_desc'].setData('');
            CKEDITOR.instances['da_desc'].setData('');
//            CKEDITOR.instances['doc_desc'].setData('');
            CKEDITOR.instances['dm_desc'].setData('');
        }
        
        $scope.add2c = function (itmx,stype,dad)
        {
            $scope.params =
            {
            "con": "add2c",
            "pd": itmx.serv_id,
            "item_type": stype,
            "x1": dad
            };
             $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (data) {
                data = data.data;
                $log.log(data);
                $scope.cart = data.cart;
                 $scope.cTotal=0;
                    $scope.cGst=0;
                    $scope.cContainer=0;
                    $scope.countContainer=0;
                    $scope.cGTotal=0;
                    angular.forEach($scope.cart, function (value, key)
                    {
                        $scope.cTotal=$scope.cTotal+value['item_price']*value['item_quan'];
                        $scope.cGst=parseFloat($scope.cGst)+parseFloat(value['item_total'])-parseFloat(value['item_price']*value['item_quan']);
//                        console.log("$scope.cGTotal :"+parseFloat(value['item_total'])-parseFloat(value['item_price'])*parseFloat(value['item_quan']));
//                        console.log("$scope.cGTotal2 :"+$scope.cGst);
                        if(value['sub_item']==1)
                        {
                            $scope.cContainer=$scope.cContainer+parseInt(value['item_quan'])*5;
                            $scope.countContainer=$scope.countContainer+parseInt(value['item_quan']);
                        }                
                    });
                    $scope.cGTotal=$scope.cTotal+$scope.cGst+$scope.cContainer;     
            });
        };
        
        $scope.upPro = function (itmx)
        {
            $scope.params =
                    {
                        "con": "get_notifi_user",
                        "itm": itmx
                    };
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (data) {
                data = data.data;

            });
        }

        $scope.$on("seletedFileTeam", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgTeam();
            });
        });
        $scope.upImgTeam = function ()
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
                $scope.teamImg=atob(data.data.img_loc);
            });
            $scope.files = [];
        };

        $scope.$on("seletedFileTeam2", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgTeam2();
            });
        });
        $scope.upImgTeam2 = function ()
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
                $scope.teamImg2=atob(data.data.img_loc);
            });
            $scope.files = [];
        };
        $scope.$on("seletedFileClients", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgClients();
            });
        });
        $scope.upImgClients = function ()
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
                $log.log('data');
                $scope.cliImg=atob(data.data.img_loc);
                $log.log(data.data.img_loc);
                $log.log($scope.cliImg);
            });
            $scope.files = [];
        };
        $scope.$on("seletedFileGal", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);                
            });
        });
        $scope.$on("upImgGal", function (event, args)
        {
            $scope.$apply(function () {
                $scope.upImgGal();                
            });
        });
        $scope.upImgGal = function ()
        {
            var x1 = "";
            $http({
                method: 'POST',
                url: $scope.dLvl + "scripts/uploadFile_gal.php",
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
                $log.log('datax');
                $scope.upImgs=[];
                angular.forEach(data.data.img_loc, function (valxx)
                {
                    $scope.upImgs.push(atob(valxx));            
                });
                $scope.files=[];
            });            
        };
        
        $scope.$on("seletedFilePro", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgPro();
            });
        });
        $scope.$on("seletedFilePro", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgPro();
            });
        });
        $scope.upImgPro = function ()
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
            });
            $scope.files = [];
        };
        $scope.$on("seletedFileEve", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgEve();
            });
        });
        $scope.upImgEve = function ()
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
                $scope.eveImg_loc = atob(data.data.img_loc);
            });
            $scope.files = [];
        };

        $scope.$on("seletedFileAwd", function (event, args)
        {
            $scope.$apply(function () {
                $scope.files.push(args.file);
                $scope.upImgAwd();
            });
        });
        $scope.upImgAwd = function ()
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
                if (angular.isDefined($scope.da))
                {
                    $scope.da.da_image = atob(data.data.img_loc);
                } else
                {
                    $scope.da = [];
                    $scope.da.da_image = atob(data.data.img_loc);
                }
            });
            $scope.files = [];
        };


        /* details */

        /*   reg   */
        
        
//        $scope.ngInItHomeContent = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.hpCons=["Banners","Services","Company","Stories","Social","Contents","Events"];
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.bnr=[];
//            $scope.toDisplay='Banners';
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Home Page Contents";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_services",'','','');
//            $scope.genFet("reg_projects",'','','');
//            $scope.genFet("reg_mul_content",'','','');
//            $scope.genFet("reg_gallery",'','','');
//            $scope.genFet("reg_banners",'','','');
//        };
//        $scope.ngInItCompany = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Home Page Contents";
//            $scope.activated = !$scope.activated;
//        };
//        $scope.ngInItTeam = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.crtTm='close';
//            $scope.showUTm='close';
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Create & Update Your Team";
//            $scope.genFet('reg_team','','','');
//            $scope.activated = !$scope.activated;
//        };
//        $scope.ngInItServices = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.crtSrv=0;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Service Manager";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_services",'','','');
//            $scope.servCreate='new';
//        };
//        $scope.ngInItClients = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.crtSrv=0;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Client & Testimonial Manager";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_clients",'','','');
//            $scope.clCreate='new';
//        };
//        $scope.ngInItTesti = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.crtSrv=0;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Client & Testimonial Manager";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_clients",'','','');
//            $scope.genFet("reg_testimonials",'','','');
//            $scope.tstCreate='new';
//        };
//        
//        $scope.ngInItPackages = function ()
//        {            
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.crtSrv=0;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Service Package Manager";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_services",'','','');
//            $scope.genFet("reg_packages",'','','');
//            $scope.packCreate='new';
//        };
//        $scope.ngInItProjects = function ()
//        {
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            $scope.crtSrv=0;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Project Manager";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_services",'','','');
//            $scope.genFet("reg_projects",'','','');
//            $scope.projCrt='new';
//        };
//        $scope.ngInItGal = function ()
//        {
////            alert();  
//            $scope.upImgs=[];
//            $scope.img_up_loc="";
//            $scope.body_class="body_regC";
//            $scope.showHead = 1;
//            document.getElementById("xxxx2").style.display = "none";
//            $scope.siteH1name="Gallery Manager";
//            $scope.activated = !$scope.activated;
//            $scope.genFet("reg_services",'','','');
//            $scope.genFet("reg_projects",'','','');
//            $scope.genFet("reg_gallery",'','','');
//            $scope.genFet("reg_albums",'','','');
//            $scope.showCreat=false;
//            $scope.selGalsAlb=[];
//            $scope.showAlbUp=false;
//        };
//        
        
        
        
        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        };
        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        
        /*  reg     */
        
        $scope.ranger=function(i)
        {
            var x=[];
            var j=1;
            for(j=1;j<=i;j++)
            {   
                x.push(j);
            }
            return x;
        };
        $scope.indexedRanger=function(grps)
        {
            var x=[];
            var j=1;
            $scope.tempstr=[];
            $scope.tempQSum=[];
            for(j=0;j<parseInt(grps);j++)
            {   
                var y={};
                y['id']=j;
                y['ind_mark']=0;
                y['tot_ques']=0;
                y['lvl1']=0;
                y['lvl2']=0;
                y['lvl3']=0;
                y['lvl4']=0;
                y['topics']=0;
                y['ao']='none';
                y['set1']=0;
                y['set2']=0;
                y['note']=0;
                y['to_ans']=0;
                y['grp_name']="";
                $scope.tempstr[j]="";
                $scope.tempQSum[j]={};
                $scope.tempQSum[j]['val']=0;
                $scope.tempQSum[j]['txt']='';
                x.push(y);
            }
            $scope.tempGrp=x;
            return x;
        };        
        $scope.rangerYr=function(i)
        {
            var x=[];
            var x1=parseInt(i);
            var x2=parseInt((new Date()).getFullYear());
            for(x1;x1<=x2;x1++)
            {   
                x.push(x1);
            }
            return x;
        };
        $scope.postForm=function(x1,x2,hasimg)
        {
            if(x1==='register')
            {
//                if(x2.conPass===x2.pass)
//                {
//                       $scope.reg.error==''; 
//                }
//                else
//                {
//                    $scope.reg.error="Both Passwords should match";
//                    return;
//                }
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
                x2.testimonial=CKEDITOR.instances['testimonial'].getData();
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
                data = data.data;                            
                $log.log(data);
                if(x1==='reg_services')
                {
                    $scope.allServs=data;
                    alert('Inserted');
                }
                if(x1==='reg_packages')
                {
                    $scope.allPacks=data;
                    alert('Inserted');
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
            if(x1=='reg_services')
            {
                x2.serv_ldesc=CKEDITOR.instances['abtUp'].getData();
            }
            else if(x1==='reg_projects')
            {
                x2.l_desc=CKEDITOR.instances['l_descUp'].getData();                
            }
            else if(x1==='reg_packages')
            {
                x2.pack_desc=CKEDITOR.instances['pack_descUP'].getData();                
            }
            else if(x1==='reg_banners')
            {
                x2.bnr_desc=CKEDITOR.instances['bnr_desc'].getData();                
            }
            else if(x1==='reg_clients')
            {
                if(angular.isDefined($scope.cliImg) && $scope.cliImg!="")
                {
                    x2.cl_logo=$scope.cliImg;
                    hasimg='cl_logo';
                }
                else
                {
                    hasimg='';
                }
            }
            else if(x1==='reg_testimonials')
            {      
                x2.testimonial=CKEDITOR.instances['testimonialUP'].getData();
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
                if(x1==='reg_services')
                {
                    alert("Service Updated");
                    $scope.genFet("reg_services",'','','');
                }
                if(x1==='reg_clients')
                {
                    alert("Service Updated");
                    $scope.allClients=data;
                    $scope.cliImg='';
                    $scope.clCreate='new';
                }
                if(x1==='reg_testimonials')
                {
                    alert("Testimonial Updated");
                    $scope.allTsti=data;
                    $scope.cliImg='';
                    $scope.tstCreate='new';
                }
                else if(x1==='reg_packages')
                {
                    alert("Package Updated");
                    $scope.allPacks=data;
                    $scope.packCreate='new';
                }
                else if(x1==='reg_mul_content')
                {
                    $scope.varCons=data;
                    alert("Updated");
                }
                else if(x1==='courses')
                {
                    alert("Updated");
                    $scope.allCourses=data;
                }
                else if(x1==='reg_gallery')
                {
                    alert("Updated");
                    $log.log('$scope.allGals');
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
                    $log.log($scope.allTeam);
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
                    if(x1==='reg_services')
                    {
                        alert("Service Updated");
                        $scope.genFet("reg_services",'','','');
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
        $scope.getServName=function(id)
        {
            var x=[];
            var serv_name='';
            angular.forEach($scope.allServs, function (value)
            {
                if (value['serv_id'] == id)
                {
                    var serv_name=value['serv_name'];
                }
            });
            $log.log(serv_name);
            return serv_name;
        }
        $scope.gotoItem=function(itm)
        {
            focusOn('editor_'+itm);
            $scope.toDisplay=itm;
        };
        $scope.callUpdate=function(itm)
        {
            $scope.crtTm='close';
            $scope.showUTm='update';
            $scope.selTms=itm;
            CKEDITOR.instances['abtUp'].setData($scope.selTms.mem_ldesc);            
//            $scope.teamImg2=itm.mem_pic;
            console.log($scope.showUTm);
        };
        $scope.getChlds=function(id)
        {
            var x=[];
            angular.forEach($scope.allServs, function (value)
            {
                if (value['serv_par'] == id)
                {
                    x.push(value);
                }
            });
            return x;
        }
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
                data = data.data;
                if(tab==='reg_services')
                {
                    $scope.allServs=data;
                }
                if(tab==='items')
                {
                    $log.log(data);
                    $log.log('allitems');
                    $scope.allItem=data;
                }
                if(tab==='itemsX')
                {
                    $log.log(data);
                    $log.log('allitems');
                    $scope.allItem=data;
                }
                if(tab==='reg_clients')
                {
                    $scope.allClients=data;
                }
                if(tab==='reg_testimonials')
                {
                    $scope.allTsti=data;
                }
                if(tab==='reg_packages')
                {
                    $scope.allPacks=data;
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
                if(tab==='cart')
                {
                    $scope.cart=data;
                    $scope.cTotal=0;
                    $scope.cGst=0;
                    $scope.cContainer=0;
                    $scope.countContainer=0;
                    $scope.cGTotal=0;
                    angular.forEach($scope.cart, function (value, key)
                    {
                        $scope.cTotal=$scope.cTotal+value['item_price']*value['item_quan'];
                        $scope.cGst=parseFloat($scope.cGst)+parseFloat(value['item_total'])-parseFloat(value['item_price']*value['item_quan']);
//                        console.log("$scope.cGTotal :"+parseFloat(value['item_total'])-parseFloat(value['item_price'])*parseFloat(value['item_quan']));
//                        console.log("$scope.cGTotal2 :"+$scope.cGst);
                        if(value['sub_item']==1)
                        {
                            $scope.cContainer=$scope.cContainer+parseInt(value['item_quan'])*5;
                            $scope.countContainer=$scope.countContainer+parseInt(value['item_quan']);
                        }                
                    });
                    $scope.cGTotal=$scope.cTotal+$scope.cGst+$scope.cContainer;           
                    
                }
            });
        }; 
        $scope.upServ=function(id)
        {
            $scope.servCreate='update';
            var x=$scope.allServs;
            angular.forEach(x, function (value)
            {
                if (value['serv_id'] == id)
                {
                    x=value;
                    CKEDITOR.instances['abtUp'].setData(value.serv_ldesc);
                }
            });
            $scope.servUp=x;
        };
        $scope.upPacks=function(id)
        {
            $scope.packCreate='update';
            var x=$scope.allPacks;
            angular.forEach(x, function (value)
            {
                if (value['pack_id'] == id)
                {
                    x=value;
                    CKEDITOR.instances['pack_descUP'].setData(value.pack_desc);
                }
            });
            $scope.packxUp=x;
        };
        $scope.upClis=function(id)
        {
            $scope.clCreate='update';
            var x=$scope.allClients;
            angular.forEach(x, function (value)
            {
                if (value['cl_id'] == id)
                {
                    x=value;
                }
            });
            $scope.cliImg='';
            $scope.clintsxUp=x;
        };
        $scope.upTst=function(id)
        {
            $scope.tstCreate='update';
            var x=$scope.allTsti;
            angular.forEach(x, function (value)
            {
                if (value['cl_id'] == id)
                {
                    x=value;
                    CKEDITOR.instances['testimonialUP'].setData(value.testimonial);
                }
            });
            $scope.cliImg='';
            $scope.tstxUp=x;
        };        
        $scope.postAbout=function(typeP,id,val)
        {
            if(typeP=='about_video')
            {
                $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'');
            }
            else if(typeP=='conEVE')
            {
                if(val.con_loc=='img')
                {
                    if(angular.isDefined($scope.eveImg_loc) && $scope.eveImg_loc!='')
                    {
                        val.con_val=$scope.eveImg_loc;
                    }                    
                    $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'con_val');
                }
                else
                {
                    $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'');
                }
            }
            else
            {
                val.con_val=CKEDITOR.instances[typeP].getData();
                $scope.postFormUpdate('reg_mul_content',val,'rmc_id',id,'');
            }
        };
        $scope.postTeam=function(typ,arr,imgx)
        {
            if(typ==='new')
            {
                arr.mem_pic=imgx;
                arr.mem_ldesc=CKEDITOR.instances['abt'].getData();
                $scope.postForm('reg_team',arr,'mem_pic');
            }
            else if(typ==='update')
            {
                $log.log(arr);
                $log.log('arr');
                arr.mem_ldesc=CKEDITOR.instances['abtUp'].getData();
                if(angular.isDefined($scope.teamImg2) && $scope.teamImg2!='')
                {
                    arr.mem_pic=imgx;
                    $scope.postFormUpdate('reg_team',arr,'tm_id',arr['tm_id'],'mem_pic');
                    $scope.teamImg2='';
                    $scope.selTms=[];
                    $scope.closeTmUp(2);
                }
                else
                {
                    $log.log(arr['tm_id']);
                    $scope.postFormUpdate('reg_team',arr,'tm_id',arr['tm_id'],'');
                }
                
            }
            
        };
        $scope.closeTmUp=function(vx)
        {
            if(vx===1)
            {
                $scope.crtTm='close';
                console.log($scope.crtTm);      
            }
            if(vx===3)
            {
                $scope.crtTm='new';
                $scope.showUTm='close';
            }
            else
            {
                $scope.showUTm='close';
            }
            
            
        };
        $scope.getBnr=function(id)
        {
            $scope.bnr=[];
            angular.forEach($scope.allBnrs, function (value)
            {
                if(value.bnr_id==id)
                {
                    
                    $scope.bnr=angular.copy(value);
                    v=[];
                    CKEDITOR.instances['bnr_desc'].setData($scope.bnr.bnr_desc);
                    $log.log('bnr data');
                    $log.log($scope.bnr);
                }
            });
        }
        $scope.selGalBnr=function(gal_id)
        {
            $scope.bnr.gal_id=gal_id;
        }
        $scope.getGalLoc=function(gal_id)
        { 
            var str='';
            angular.forEach($scope.allGals, function (value)
            {
               if(value.gal_id==gal_id)
               {
                   str=value.img_loc;
               }
            });
            return str;
        }        
        $scope.selGalCls=function(gal_id)
        { 
            var tmp1=[];
            tmp1[0]=gal_id;
            $log.log(tmp1);
            $log.log($scope.selGalsAlb);
            if(commonElements(tmp1,$scope.selGalsAlb))
            {
                $scope.selGalsAlb.pop($scope.selGalsAlb.indexOf(gal_id));
            }
            else
            {
                $scope.selGalsAlb.push(gal_id);
            }            
            $log.log($scope.selGalsAlb);
        }
        $scope.isSelGal=function(gal_id)
        {
            var tmp1=[];
            tmp1[0]=gal_id;
            if(commonElements(tmp1,$scope.selGalsAlb))
            {
                return true;
            }
            else
            {
                return false;
            }
        }        
        $scope.setSelAlb=function(itm)
        {
            $scope.selAlb=itm;
            $scope.crtAlbUP={};
            $scope.crtAlbUP=itm;
            document.getElementById('ualb_descUP').innerHTML=itm.alb_desc;
        }
        $scope.upSelImgAlb=function(typ)
        {            
//            document.getElementById('alb_descUP').innerHTML=$scope.selAlb.alb_desc;
            if(typ=='usia')
            {
                var xid=$scope.selAlb.alb_id;
            }
            else if(typ=='usip')
            {                
                var xid=$scope.selAlbProj.pro_id;
            }
            $scope.params =
            {
                "con": "gen_up",
                "x1":typ,
                "x2":$scope.selGalsAlb,
                "ret":'all',
                "k":'',
                "v":xid,
                "hasImg":''
            };
            $log.log($scope.params);
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.params,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (data) {
                data = data.data;
                if(typ=='usia')
                {
                    $scope.selAlb=data.updated[0];
                    $scope.allAlbs=data.all;
                }
                else if(typ=='usip')
                {                
                    $scope.selAlbProj=data.updated[0];
                    $scope.allProjs=data.all;
                }
                
                $log.log(data);
            });
            $scope.selGalsAlb=[];
            $scope.closeWin();
        }
        $scope.setSelProj=function(itm)
        {
            $scope.selAlbProj=itm;
        }
        $scope.setFeaAlb=function(typ,id,itm)
        {
            if(confirm("Do you want to make it featured Image ?"))
            {
                $scope.tempx={};
                if(typ=='alb')
                {
                    $scope.tempx.alb_fea_img=itm;
                    $scope.postFormUpdate('reg_albums',$scope.tempx,'alb_id',id,'');
                    $scope.selAlb.fea_img=itm;
                }
                else if(typ=='pro')
                {
                    $scope.tempx.fea_img=itm;
                    $scope.postFormUpdate('reg_projects',$scope.tempx,'pro_id',id,'');
                    $scope.selAlbProj.fea_img=itm;
                }
                
            }
        }
        $scope.selProjUp=function(dta)
        {
            $scope.projCrt='update';
            $scope.projNewUP=dta;
            CKEDITOR.instances['l_descUp'].setData(dta.l_desc);
            
        }
        $scope.getDate=function(dt)
        {
            return moment(dt);
        }
        $scope.goto=function(url)
        {
            $location.path("/bhajohariranna.com/"+url).replace().reload(false);
        }
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




appAll.run(function (ngMeta, $rootScope) {
    ngMeta.init();
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
//        console.log("$stateChangeStart " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
    });
    $rootScope.$on('$stateChangeSuccess', function () {
//        console.log("$stateChangeSuccess " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
    });
    $rootScope.$on('$stateChangeError', function () {
//        console.log("$stateChangeError " + fromState.name + JSON.stringify(fromParams) + " -> " + toState.name + JSON.stringify(toParams));
    });
});



appAll.config(['$stateProvider', '$locationProvider', 'ngMetaProvider', 'ADMdtpProvider', 'calendarConfig',
    function ($stateProvider, $locationProvider, ngMetaProvider, ADMdtp, calendarConfig)
    {
//        console.log(calendarConfig);
        var siteU="https://sabjantaa.com/bhajohariranna.com/";
        var vLoc='/bhajohariranna.com/';
        var fLoc='bhajohariranna.com/';
        calendarConfig.templates.calendarMonthView = siteU+'inc/templates/calendarMonthView.html';
        calendarConfig.templates.calendarMonthCell = siteU+'inc/templates/calendarMonthCell.html';
        calendarConfig.templates.calendarDayView = siteU+'inc/templates/calendarDayView.html';
        calendarConfig.templates.calendarWeekView = siteU+'inc/templates/calendarWeekView.html';
        calendarConfig.dateFormatter = 'moment';
        calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
        calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
        calendarConfig.i18nStrings.weekNumber = 'Week {week}';
        calendarConfig.displayAllMonthEvents = true;
        calendarConfig.showTimesOnWeekView = true;

        var home = {
            name: 'home',
            url: vLoc,
            templateUrl: fLoc+'pages/index.php',
            controller: function ($stateParams) {
                //document.getElementById("xxxx2").style.display = "block";
            },
            controllerAs: 'ctrl'
        };
        var home2 = {
            name: 'home2',
            url: vLoc+'login',
            templateUrl: fLoc+'pages/login.php',
            controller: function ($stateParams) {
                //document.getElementById("xxxx2").style.display = "block";
            },
            controllerAs: 'ctrl'
        };
        
        
        var dashboard = {
            name: 'dashboard',
            url: vLoc+'/dashboard',
            templateUrl: fLoc+'pages/dashboard.php',
            controller: function ($stateParams) {
                document.getElementById("xxxx2").style.display = "block";
                var self = this;
            },
            controllerAs: 'ctrl'

        };
        var about = {
            name: 'about',
            url: vLoc+'about',
            templateUrl: fLoc+'pages/about.php',
            controller: function ($stateParams) {
                //document.getElementById("xxxx2").style.display = "block";
                var self = this;
            },
            controllerAs: 'ctrl'

        };        
        var contact = {
            name: 'contact',
            url: vLoc+'contact',
            templateUrl: fLoc+'pages/contact.php',
            controller: function ($stateParams) {
                //document.getElementById("xxxx2").style.display = "block";
                var self = this;
            },
            controllerAs: 'ctrl'
        };            
        var menu = {
            name: 'menu',
            url: vLoc+'menu',
            templateUrl: fLoc+'pages/menu.php',
            controller: function ($stateParams) {
                //document.getElementById("xxxx2").style.display = "block";
                var self = this;
            },
            controllerAs: 'ctrl'

        }; 
        var offers = {
            name: 'offers',
            url: vLoc+'offer',
            templateUrl: fLoc+'pages/offer.php',
            controller: function ($stateParams) {
                //document.getElementById("xxxx2").style.display = "block";
                var self = this;
            },
            controllerAs: 'ctrl'
        }; 
        var items = {
            name: 'items',
            url: vLoc+'menu/:param1',
            templateUrl: fLoc+'pages/menu.php?vvv{{ctrl.id}}',
            controller: function ($stateParams) {
//                alert('xx');
//                document.getElementById("xxxx2").style.display = "block";
                var self = this;
                self.id = $stateParams.param1;
            },
            controllerAs: 'ctrl'
        }; 
        var validate = {
            name: 'validate',
            url: vLoc+'verify/:param1',
            templateUrl: fLoc+'pages/validate.php?{{ctrl.id}}',
            controller: function ($stateParams) {
//                alert('xx');
//                document.getElementById("xxxx2").style.display = "block";
                var self = this;
                self.id = $stateParams.param1;
            },
            controllerAs: 'ctrl'
        }; 
        var cart = {
            name: 'cart',
            url: vLoc+'cart',
            templateUrl: fLoc+'pages/cart.php',
            controller: function ($stateParams) {
//                alert('xx');
//                document.getElementById("xxxx2").style.display = "block";
                var self = this;
                self.id = $stateParams.param1;
            },
            controllerAs: 'ctrl'
        }; 
        var checkout = {
            name: 'checkout',
            url: vLoc+'checkout',
            templateUrl: fLoc+'pages/checkout.php',
            controller: function ($stateParams) {
//                alert('xx');
//                document.getElementById("xxxx2").style.display = "block";
                var self = this;
                self.id = $stateParams.param1;
            },
            controllerAs: 'ctrl'
        }; 
        
        
        
        $stateProvider.state(home);
        $stateProvider.state(home2);
        $stateProvider.state(dashboard);
        $stateProvider.state(about);
        $stateProvider.state(contact);
        $stateProvider.state(menu);
        $stateProvider.state(offers);
        $stateProvider.state(items);
        $stateProvider.state(cart);
        $stateProvider.state(checkout);
//        $stateProvider.state(packages);
//        $stateProvider.state(gallery);
//        $stateProvider.state(clients);
//        $stateProvider.state(testimonials);
//        $stateProvider.state(projects);
//        $stateProvider.state(new_tutor);
//        $stateProvider.state(update_tutor);
//        $stateProvider.state(new_batch);
//        $stateProvider.state(tutor_profile);
//        $stateProvider.state(assign_tutor);
//        $stateProvider.state(student_enrolled_online);
//        $stateProvider.state(new_student);
//        $stateProvider.state(all_students);
//        $stateProvider.state(student_attendance);
//        $stateProvider.state(mock_create);
//        $stateProvider.state(mock_manage);
//        $stateProvider.state(create_study_material);
//        $stateProvider.state(current_batches);
//        $stateProvider.state(create_ques);
//        $stateProvider.state(manage_ques);
        
        
        
        /*$stateProvider.state(categories);
        $stateProvider.state(products);
        $stateProvider.state(puja2);
        $stateProvider.state(pujas);
        $stateProvider.state(details);
        $stateProvider.state(reg);
        $stateProvider.state(regCon);
        $stateProvider.state(account);
        $stateProvider.state(update_profile);
        $stateProvider.state(student_profile);
        $stateProvider.state(student_generate);
        $stateProvider.state(acc_privacy);
        $stateProvider.state(weak_subjects);
        $stateProvider.state(profiler_graphs);
        $stateProvider.state(payments);        
        $stateProvider.state(ledger);        
        $stateProvider.state(active_tutors);        
        $stateProvider.state(new_tutor);        
        $stateProvider.state(new_tution);        
        $stateProvider.state(week_sheet);        
        $stateProvider.state(tution_noti);        
        $stateProvider.state(report_online_exam);        
        $stateProvider.state(report_tutor_exam);        
        $stateProvider.state(update_exam_rep);*/
        
        
        
        

        $locationProvider.html5Mode(true);
        ADMdtp.setOptions({
            calType: 'gregorian',
            format: 'YYYY/MM/DD',
            default: 'today',
            autoClose: 'true'
        });
    }]);

appAll.directive('uploadFiles', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFiles", {file: files[i]});
                }
            });
        }
    };
});

/* details */


appAll.directive('uploadFilesTeam', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFileTeam", {file: files[i]});
                }
            });
        }
    };
});

appAll.directive('uploadFilesTeam2', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFileTeam2", {file: files[i]});
                }
            });
        }
    };
});
appAll.directive('uploadFilesClients', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFileClients", {file: files[i]});
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
                    scope.$emit("seletedFileGal", {file: files[i],intI:i});
                }
                scope.$emit('upImgGal', {ln:files.length});
            });
        }
    };
});

appAll.directive('uploadFilesAwd', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFileAwd", {file: files[i]});
                }
            });
        }
    };
});

appAll.directive('uploadFilesPro', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFilePro", {file: files[i]});
                }
            });
        }
    };
});
appAll.directive('uploadFilesEve', function () {
    return {
        scope: true, //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFileEve", {file: files[i]});
                }
            });
        }
    };
});


/* details */


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
            } else
            {
                return 'none';
            }
        } else
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

var xdt = new Date();
var xmon = '';
var xyr = '';

appAll.filter('fltrStatDeact', function () {
    return function (datasource) {
        var out = [];
        angular.forEach(datasource, function (record) {
            if (record['status'] === 'deactive') {
                out.push(record);
            }
        });
        return out;
    };
});

appAll.filter('fltrStatAct', function () {
    return function (datasource) {
        var out = [];
        angular.forEach(datasource, function (record) {
            if (record['status'] == 'active') {
                out.push(record);
            }
        });
        return out;
    };
});
appAll.filter('fltrSesActCls', function () {
    return function (datasource,val) {
        var out = [];
        angular.forEach(datasource, function (record) {
            if (record['status'] === 'active') {
                if (record['cls_id'] === val) {
                    out.push(record);
                }
            }
        });
        return out;
    };
});
appAll.filter('filQuesAll', function () {
    return function (datasource,val) {
        var out= [];
        var out1= [];var out2= [];var out3 = [];
        var x1=0;
//        console.log(val);
        angular.forEach(datasource, function (record) {
            if(angular.isDefined(val))
            {                
                if(angular.isDefined(val.cls_id) || angular.isDefined(val.subject) || angular.isDefined(val.cls_id))
                { 
//                    console.log(val);
                    if (angular.isDefined(val.cls_id) && val.cls_id!=='null') 
                    {
                        if(record['cls_id'] === val.cls_id) 
                        {
                            out1.push(record);
                        }
                    }
                    else
                    {
                        out1.push(record);
                    }
                    if (angular.isDefined(val.subject) && val.subject!=='null') 
                    {
                        if(record['subjects'] === val.subject) 
                        {
                            out2.push(record);
                        }
                    }
                    else
                    {
                        out2.push(record);
                    }
                    if (angular.isDefined(val.keywords) && val.keywords!=='null') 
                    {
                        val.keywords=splitIt(val.keywords);
                        record['keywords']=splitIt(record['keywords']);
//                        console.log('keywords'+val.keywords);
//                        console.log(commonElements(val.keywords,record['keywords']));
                        if(commonElements(val.keywords,record['keywords'])) 
                        {
                            out3.push(record);
                        }
                    }
                    else
                    {
                        out3.push(record);
                    } 
                    x1=1;
                    
                }
                if(!angular.isDefined(val.cls_id) && !angular.isDefined(val.subject) && !angular.isDefined(val.cls_id))
                {
                    out.push(record);
                }                
            }
            else
            {
                out.push(record);
            }
            if(x1===1)
            {
                out=intersection(out1,out2,out3);
            }
        });
        return out;
    };
});
appAll.filter('filTutoSubCls', function () {
    return function (datasource,sub,cls) {
        var out = [];
        var x1=0;
        if(angular.isDefined(sub) && angular.isDefined(cls))
        {
            
            angular.forEach(datasource, function (record) {
                x1=0;
                angular.forEach(record['cls_subs'], function (record2) {
    //                console.log('XXFound'+record['name']+"record2['subjects']");
                    if (record2['subjects'] === sub)
                    {
                        if(record2['cls_id'] === cls) 
                        {
//                            console.log("ID ::::"+record['tuto_id']+"sub ::::"+record2['subjects']+"  cls: "+record2['cls_id']);
                            x1=1;
                        }
                    }
                });
                if(x1==1)
                {
    //                console.log('>>>Found'+record['name'])
                    out.push(record);
                }
            });
        }
        return out;
    };
});
appAll.filter('filClsBat', function () {
    return function (datasource,cls) {
        var out = [];
        var x1=0;
        if(angular.isDefined(cls))
        {
            angular.forEach(datasource, function (record) {
                if (record['cls_id'] === cls)
                {
                    out.push(record);
                }
            });
        }
        else
        {
            angular.forEach(datasource, function (record) {
                out.push(record);
            });
        }
        return out;
    };
});
appAll.filter('filActSch', function () {
    return function (datasource) {
        var out = [];
        angular.forEach(datasource, function (record,key) 
        {
            if (record['status'] === 'active')
            {
                out.push(record);
            }
        });
        return out;
    };
});
appAll.filter('filTutoBat', function () {
    return function (datasource,tuto) {
        var out = [];
        var x1=0;
        if(angular.isDefined(tuto))
        {
            angular.forEach(datasource, function (record) {
                if (record['tuto_id'] === tuto)
                {
                    out.push(record);
                }
            });
        }
        return out;
    };
});
appAll.filter('filClsRoomBat', function () {
    return function (datasource,room) {
        var out = [];
        if(angular.isDefined(room))
        {
            var x1=0;
            angular.forEach(datasource, function (record) {
                x1=0;
                angular.forEach(record['schedules'], function (record2) {
                    
                    if (record2['room_no']==room)
                    {
                        x1=1;
                        record2['highlight']='true';                        
                    }
                });
                if(x1==1)
                {
                    out.push(record);
                }
            });
        }
        return out;
    };
});
appAll.filter('spaceless', function () {
    return function (input) {
        if (input) {
            return input.replace(/\s+/g, '-');
        }
    }
});
appAll.filter('filExtra', function () {
    return function (datasource,fil) {
        var out = [];
        var x1=0;
//        console.log(fil);
        angular.forEach(datasource, function (record) {
            x1=0;
//            console.log(fil);
//            angular.forEach(out, function (record2) {
           
                if(record.vnv=='')
                {
                    console.log('4');
//                    console.log(fil);
                     if(fil.serv_name=='')
                    {
                        x1=1;
                        console.log('5');
                    }
                    else
                    {
                        if(fil.serv_name==record['vnv'])
                            x1=1;
                        console.log('6');
                    }
                    
                }
                else
                {
                    if(fil.vnv===record['vnv'])
                    {
//                        console.log('1');
//                        console.log(record);
                        if(fil.serv_name=='')
                        {
                            x1=1;
//                            console.log('2');
                        }
                        else
                        {
                            if(fil.serv_name==record['vnv'])
                            {
                                x1=1;
                            }
//                            console.log('3');
                        }
                    }
                }
//                
//                if(angular.isDefined(fil.serv_name) && angular.isDefined(fil.vnv))
//                {
//                    if(record2.serv_name!='' && record2.serv_name==fil.serv_name &&  record2.vnv==fil.vnv) {
//                        x1=1;
//                    }
////                    console.log(record2.serv_name);
//                }
//                else if(angular.isDefined(fil.vnv))
//                {
//                    if (record2.vnv==fil.vnv) {
//                        x1=1;
//                    }
//                }
//                else 
//                {
//                    if (record2.serv_name==fil.serv_name) {
//                        x1=1;
//                    }
//                }
//            });
            if(x1===0)
            {
                out.push(record);
            }
            
        });
        return out;
    };
});
appAll.filter('titleCase', function () {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
});


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
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

function splitIt(val)
{
    var xx1=new String(val); 
    var x2= xx1.split(',');
    return x2;
}
function splitIt2(val)
{
    var xx1=new String(val); 
    var x2= xx1.split('||XX||');
    return x2;
}
function focusOn(val)
{
    document.getElementById(val).scrollIntoView();
//    $("#"+val).focus();
}

function commonElements(arr1, arr2) {

    // iterating over arr1, using
    // Array.prototype.some() wherein
    // 'el' is the current element of
    // the array over which we're iterating:
    return arr1.some(function (el) {

        // finding the 'el' value in
        // arr2; and comparing the index
        // if the 'el' value isn't found
        // in arr2 it returns -1:
        return arr2.indexOf(el) > -1;
    });
}

function intersection() {
    var result = [];
    var lists;

    if (arguments.length === 1) {
        lists = arguments[0];
    } else {
        lists = arguments;
    }

    for (var i = 0; i < lists.length; i++) {
        var currentList = lists[i];
        for (var y = 0; y < currentList.length; y++) {
            var currentValue = currentList[y];
            if (result.indexOf(currentValue) === -1) {
                var existsInAll = true;
                for (var x = 0; x < lists.length; x++) {
                    if (lists[x].indexOf(currentValue) === -1) {
                        existsInAll = false;
                        break;
                    }
                }
                if (existsInAll) {
                    result.push(currentValue);
                }
            }
        }
    }
    return result;
}
 
