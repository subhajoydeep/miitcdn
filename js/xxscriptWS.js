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
            $scope.currentPage = 0;
            $scope.pageSize = 9;
            $scope.url='scripts/qfinder_main_web';
            $scope.modalWin='false';
            $scope.firstCall();
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
        
        $scope.initIndexPage=function()
        {
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
        
        $scope.pageVarInit=function()
        {
            $scope.getAllItems();            
//            $scope.vm = {};
//            $scope.vm.pager = {};
//            $scope.vm.setPage = $scope.setPage;
        }
        $scope.ifrmVid=function(url) 
        {
            return($sce.trustAsResourceUrl(url));
        }
        
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
        calendarConfig.templates.calendarMonthView = 'http://localhost/OfflineProjects/mod15/router/inc/templates/calendarMonthView.html'; 
        calendarConfig.templates.calendarMonthCell = 'http://localhost/OfflineProjects/mod15/router/inc/templates/calendarMonthCell.html'; 
        calendarConfig.templates.calendarDayView = 'http://localhost/OfflineProjects/mod15/router/inc/templates/calendarDayView.html'; 
        calendarConfig.templates.calendarWeekView = 'http://localhost/OfflineProjects/mod15/router/inc/templates/calendarWeekView.html'; 
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

        $stateProvider.state(home);
        $stateProvider.state(about);
        $stateProvider.state(puja);
        $stateProvider.state(puja2);
        $stateProvider.state(pujas);

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

