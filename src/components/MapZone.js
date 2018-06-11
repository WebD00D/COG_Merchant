import React, { PureComponent } from "react";

import cx from "classnames";

const GOOGLE_API_KEY = "AIzaSyBu0azHVEJf3dYGGq1s8Ck3LMZKFZIRORI";

class MapZone extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePlaceMarker = this._handlePlaceMarker.bind(this);
    this._handleSetSelection = this._handleSetSelection.bind(this);
    this._getPolygonCoords = this._getPolygonCoords.bind(this);
  }

  componentDidMount() {
    console.log("google maps", google);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let map = new google.maps.Map(document.getElementById("map"), {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 18
        });


         // Construct the polygon

         var aNewShapeCoords = [
         new google.maps.LatLng(34.000559,-118.440392),
         new google.maps.LatLng(34.000314,-118.439035),
         new google.maps.LatLng(33.999532,-118.439791),
         new google.maps.LatLng(33.999287,-118.440923),
         new google.maps.LatLng(34.000096,-118.441224),
         new google.maps.LatLng(34.000274,-118.440843),
     ];
         let aNewShape = new google.maps.Polygon({
             paths: aNewShapeCoords,
             draggable: true,
             editable: true,
             strokeColor: '#FF0000',
             strokeOpacity: 0.8,
             strokeWeight: 2,
             fillColor: '#FF0000',
             fillOpacity: 0.35
         });

         aNewShape.setMap(map);
    // google.maps.event.addListener(bermudaTriangle, "dragend", getPolygonCoords);
    // google.maps.event.addListener(bermudaTriangle.getPath(), "insert_at", getPolygonCoords);
    // google.maps.event.addListener(bermudaTriangle.getPath(), "remove_at", getPolygonCoords);
    // google.maps.event.addListener(bermudaTriangle.getPath(), "set_at", getPolygonCoords);

         var all_overlays = [];


           var selectedShape;
           var drawingManager = new google.maps.drawing.DrawingManager({
               drawingMode: google.maps.drawing.OverlayType.MARKER,
               drawingControl: true,
               drawingControlOptions: {
                   position: google.maps.ControlPosition.TOP_CENTER,
                   drawingModes: [
                       google.maps.drawing.OverlayType.POLYGON,
                   ]
               },

               polygonOptions: {
                   clickable: true,
                   draggable: false,
                   editable: false,
                   fillColor: '#252525',
                   fillOpacity: 0.4,
               },

           });

           drawingManager.setMap(map);


           google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {

               all_overlays.push(event);
               console.log("OVERLAY EVENT", event.overlay)

               if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                   drawingManager.setDrawingMode(null);
                   //Write code to select the newly selected object.

                   var newShape = event.overlay;
                   newShape.type = event.type;

                   console.log("EVENT COODINATES", newShape.getPath());

                    this._getPolygonCoords(newShape)

                   google.maps.event.addListener(newShape, 'click', function() {
                     this._handleSetSelection(newShape);

                   }.bind(this));

                   this._handleSetSelection(newShape);
               }
           }.bind(this));



            // var centerControlDiv = document.createElement('div');
            // var centerControl = new CenterControl(centerControlDiv, map);
            //
            // centerControlDiv.index = 1;
            // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);


      }.bind(this));
    }
  }

  _handlePlaceMarker(location, map) {
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
  }

  _handleSetSelection(shape) {
              //clearSelection();
              var selectedShape = shape;
              shape.setEditable(true);
              // google.maps.event.addListener(selectedShape.getPath(), 'insert_at', getPolygonCoords(shape));
              // google.maps.event.addListener(selectedShape.getPath(), 'set_at', getPolygonCoords(shape));
  }

  _getPolygonCoords = function(newShape) {
               console.log("We are one");
               var len = newShape.getPath().getLength();
               console.log("new shape", len)
               for (var i = 0; i < len; i++) {
                   console.log("NEW SHAPE", newShape.getPath().getAt(i).toUrlValue(6));
               }
      };

  render() {
    return (
      <div className="w-100p">
        GOOGLE MAPS
        <div style={{height: '500px'}} id="map" />
      </div>
    );
  }
}

export default MapZone;
