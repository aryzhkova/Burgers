var piter_map;
function init(){
    ymaps.ready(function () {
        piter_map = new ymaps.Map(document.getElementById('map'),{
            center: [59.94, 30.32],
            zoom: 12
        });
        piter_map.controls.add('zoomControl');
        piter_map.controls.add('searchControl');
        var locations = [
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.93542929153893, 30.3570662692548]
            },
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.945403579427676,30.38178550753605]
            },
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.94058878055074,30.26093589816105]
            },
            {
                adress:"Санкт-Петербург, ул. Бабушкина д12/1, 15",
                coords:[59.969982543158174,30.30093299899113]
            }
        ];

        var myCollection = new ymaps.GeoObjectCollection();
        for(var i = 0;i < locations.length; i++){
            myCollection.add(new ymaps.Placemark(locations[i].coords, {
                    hintContent: 'MrBurger',
                    balloonContent: locations[i].adress
                },{
                    iconLayout: 'default#image',
                    iconImageHref:'../assets/img/icon/map-marker.svg'
                //,
                   // iconImageSize: [30, 42]
                }
            ));
        }
        piter_map.geoObjects.add(myCollection);
    });
};
