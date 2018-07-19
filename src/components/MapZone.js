import React, { PureComponent } from "react";

import cx from "classnames";

const GOOGLE_API_KEY = "AIzaSyBu0azHVEJf3dYGGq1s8Ck3LMZKFZIRORI";

class MapZone extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePlaceMarker = this._handlePlaceMarker.bind(this);
    this._handleSetSelection = this._handleSetSelection.bind(this);
    this._getPolygonCoords = this._getPolygonCoords.bind(this);
    this._handleDeleteZone = this._handleDeleteZone.bind(this);

    this.selectedShape;

    this.setState({
      zones: [
          {
            name: "Zone 1"
          }
      ]
    })
  }

  componentDidMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {

          // initializes the map
          let map = new google.maps.Map(document.getElementById("map"), {
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom: 10
          });

          // CONSTRUCT POLYGON
          // NOTE: We'd run this block of code for each group of zone pulled in from the db..
          var aNewShapeCoords = [
            new google.maps.LatLng(34.000559, -118.440392),
            new google.maps.LatLng(34.000314, -118.439035),
            new google.maps.LatLng(33.999532, -118.439791),
            new google.maps.LatLng(33.999287, -118.440923),
            new google.maps.LatLng(34.000096, -118.441224),
            new google.maps.LatLng(34.000274, -118.440843)
          ];
          let aNewShape = new google.maps.Polygon({
            paths: aNewShapeCoords,
            draggable: false,
            editable: true,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            zoneTitle: "Zone 1"
          });

          var mapLabel = new MapLabel({
            text: 'Zone 1',
            position: new google.maps.LatLng(34.000559, -118.440392),
            map: map,
            fontSize: 22,
            align: 'right',
            zIndex: 100
          });

          aNewShape.setMap(map);
          google.maps.event.addListener(aNewShape, "click", function(event){

              this._handleSetSelection(aNewShape);

              console.log("NEW SHAPE", aNewShape)
              this._getPolygonCoords(aNewShape);
           
          }.bind(this))
          // END CONSTRUCT POLYGON

    
          var all_overlays = [];
          var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON]
            },

            polygonOptions: {
              clickable: true,
              draggable: false,
              editable: false,
              fillColor: "#252525",
              fillOpacity: 0.4,

            }
          });

          drawingManager.setMap(map);

          google.maps.event.addListener(
            drawingManager,
            "overlaycomplete",
            function(event) {

              all_overlays.push(event);
              drawingManager.setDrawingMode(null);
              
                var newShape = event.overlay;
                newShape.type = event.type;

                this._getPolygonCoords(newShape);

                google.maps.event.addListener(
                  newShape,
                  "click",
                  function() {
                    this._handleSetSelection(newShape);
                  }.bind(this)
                );

                this._handleSetSelection(newShape);
              
            }.bind(this)
          );

          all_overlays.push(event);
          all_overlays.push()


        }.bind(this)
      );
    }
  }

  _handlePlaceMarker(location, map) {
    let marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  _handleSetSelection(shape) {

    
    console.log("shape is clicked", shape);
    // this._handleClearSelection(shape);

    if (this.selectedShape) {
      this.selectedShape.setEditable(false) 
    }

    shape.setEditable(true);
    this.selectedShape = shape;
      

  }

  _handleDeleteZone() {
    if ( this.selectedShape ) {
      this.selectedShape.setMap(null);
      this.selectedShape = null;
    }
  }

  _getPolygonCoords = function(newShape) {
    console.log("NEW POLYGON SHAPE CREATED..");
    var len = newShape.getPath().getLength();
    console.log("new shape", len);
    for (var i = 0; i < len; i++) {
      console.log(
        "NEW SHAPE",
        newShape
          .getPath()
          .getAt(i)
          .toUrlValue(6)
      );
    }
  };

  render() {
    return (
      <div className="w-100p">
        COG ZONES
        <div style={{ height: "500px" }} id="map" />
        <button onClick={()=> this._handleDeleteZone()}>Delete Zone</button>
        
      </div>
    );
  }
}

export default MapZone;
