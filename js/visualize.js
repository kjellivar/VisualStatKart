/**
 * Created by storskel on 10.04.2014.
 */
angular.module("visualApp", [])
    .controller("visualController", function($scope, $http){

        $scope.years = ["2005","2006","2007","2008","2009","2010","2011","2012"];
        $scope.aldersgrupper = {
            "999D": "Alle aldre",
            "17-34": "17-34 år",
            "35-66": "35-66 år",
            "67+": "67 år eller eldre"
        };
        $scope.concepts = {
            "Brutto": "Bruttoinntekt",
            "LonnInnt": "Personinntekt lønn",
            "Uskstt": "Utligna skatt",
            "AllmennInnt": "Alminnelig inntekt etter særfradrag",
            "BankInn": "Bankinnskudd",
            "BrFormue": "Skattepliktig bruttoformue",
            "Gjeld": "Gjeld"
        };

        $scope.concept = "BrFormue";
        $scope.alder = "35-66";
        $scope.time = "2012";
        $scope.loading = false;

        $scope.$watch('time', function(){
            $scope.setView($scope.concept,$scope.time,$scope.alder);
        });
        $scope.$watch('alder', function(){
            $scope.setView($scope.concept,$scope.time,$scope.alder);
        });
        $scope.$watch('concept', function(){
            $scope.setView($scope.concept,$scope.time,$scope.alder);
        });

        var ds,title,mun,data = {};

        $scope.setView = function(concept, time, alder){

            $scope.loading = true;



            $http.get("http://data.ssb.no/api/v0/dataset/49619.json?lang=no", {cache:true})
                .success(function(jsonStat){

                    //Select the only dataset available in the bundle
                    if(!ds) {
                        ds = JSONstat(jsonStat).Dataset(0);

                        //Get municipalities IDs
                        mun = ds.Dimension("Region").id;
                    }

                    //Get title
                    title = ds.Dimension("ContentsCode").Category(concept).label;
                    title += " " + ds.Dimension("Alder").Category(alder).label;



                    //Get the values for the selected concept
                    //for all municipalities (free dimension).
                    //Time is a constant dimension.
                    //Thn transform info to the Visual data format
                    if(!data[concept])
                        data[concept] = {};
                    if(!data[concept][time])
                        data[concept][time] = {};
                    if(!data[concept][time][alder]){
                        data[concept][time][alder] = [];
                        data[concept][time][alder] = ds.Data( { "ContentsCode": concept, "Tid": time, "Alder": alder } )
                        //console.log(data);
                        .map( function( e, i ){
                            return { id: mun[i], val: e.value };
                        });
                    }


                    //2. Draw map with retrieved and transformed info
                    visual(
                        {
                            title: title,
                            time: time,

                            geo: "Oslo",
                            footer: "SSB (datasett 49619)",
                            unit: { label: "NOK" },

                            legend: true,

                            type: "cmap",
                            by: "kommune",
                            data: data[concept][time][alder],
                            callback: function(){
                               $scope.$apply(function(){
                                   $scope.loading = false;
                               });
                            }
                        }
                    );


                });
        };

        $scope.setView($scope.concept, $scope.time, $scope.alder);


    });
