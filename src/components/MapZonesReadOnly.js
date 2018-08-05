import React, { PureComponent } from "react";

import cx from "classnames";

const GOOGLE_API_KEY = "AIzaSyBu0azHVEJf3dYGGq1s8Ck3LMZKFZIRORI";

import { connect } from "react-redux";

import { Button, Icon, Spin } from "antd";

import Loading from "../components/Loading";

class MapZonesReadOnly extends PureComponent {
  constructor(props) {
    super(props);

    this._handlePlaceMarker = this._handlePlaceMarker.bind(this);
    this._handleSetSelection = this._handleSetSelection.bind(this);
    this._getPolygonCoords = this._getPolygonCoords.bind(this);
    this._handleDeleteZone = this._handleDeleteZone.bind(this);

    this._renderMap = this._renderMap.bind(this);

    this.selectedShape;

    this.state = {
      loading: true,
      updating: ""
    };
  }

  _renderMap() {
    // collect props

    console.log("_renderMap()");
    const mapId = this.props.id;
    // for now lets not worry about the users geo location.
    // when a courier is setup, we'll ask them for their city and we'll get the points that way.
    // for this, we will be using Los Angeles.

    let map = new google.maps.Map(document.getElementById(mapId, {
      center: {
        lat: 34.0207289,
        lng: -118.6926083
      },
      zoom: 10
    }));

    
    this.props.highlightedZones &&
      Object.keys(this.props.highlightedZones).map(key => {
        const zoneObj = this.props.highlightedZones[key];
        let zoneCoordinates = [];

        zoneObj.coordinates.forEach(c => {
          let splitCoord = c.split(",");
          const lat = Number(splitCoord[0]);
          const long = Number(splitCoord[1]);
          zoneCoordinates.push(new google.maps.LatLng(lat, long));
        });

        let zoneShape = new google.maps.Polygon({
          paths: zoneCoordinates,
          draggable: false,
          editable: false,
          strokeColor: zoneObj.color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: zoneObj.color,
          fillOpacity: 0.9,
          zoneTitle: zoneObj.name
        });

        zoneShape.setMap(map);
      });

    // CONSTRUCT POLYGON
    // NOTE: We'd run this block of code for each group of zone pulled in from the db..


  }

  componentWillReceiveProps() {
    console.log("component will recieve props")
  }

  componentDidUpdate() {
    console.log("render map on component did update.");
   // this._renderMap()
  }

  componentDidMount() {
    this.setState({
      loading: false
    });

    console.log("rneder map on component did mount")
    this._renderMap();

    return;
  
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        function(position) {
          // initializes the map
          let map = new google.maps.Map(
            document.getElementById(this.props.id),
            {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              zoom: 10
            }
          );

          this.props.coordinateSet &&
            Object.keys(this.props.coordinateSet).map(key => {
              const zoneObj = this.props.coordinateSet[key];
              let zoneCoordinates = [];

              zoneObj.coordinates.forEach(c => {
                let splitCoord = c.split(",");
                const lat = Number(splitCoord[0]);
                const long = Number(splitCoord[1]);
                zoneCoordinates.push(new google.maps.LatLng(lat, long));
              });

              let zoneShape = new google.maps.Polygon({
                paths: zoneCoordinates,
                draggable: false,
                editable: false,
                strokeColor: zoneObj.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: zoneObj.color,
                fillOpacity: 0.9,
                zoneTitle: zoneObj.name
              });

              zoneShape.setMap(map);
            });

          // CONSTRUCT POLYGON
          // NOTE: We'd run this block of code for each group of zone pulled in from the db..

          // var aNewShapeCoords = [];
          // this.props.currentCoordinateSet &&
          //   this.props.currentCoordinateSet.forEach(c => {
          //     let splitCoord = c.split(",");
          //     const lat = Number(splitCoord[0]);
          //     const long = Number(splitCoord[1]);
          //     aNewShapeCoords.push(new google.maps.LatLng(lat, long));
          //   });

          // let aNewShape = new google.maps.Polygon({
          //   paths: aNewShapeCoords,
          //   draggable: false,
          //   editable: true,
          //   strokeColor: "#000000",
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: zoneColor,
          //   fillOpacity: 0.9,
          //   zoneTitle: "Zone 1"
          // });

          // aNewShape.setMap(map);

          // END CONSTRUCT POLYGON
        }.bind(this),
        function(error) {
          let map = new google.maps.Map(
            document.getElementById(this.props.id),
            {
              center: {
                lat: 34.0207289,
                lng: -118.6926083
              },
              zoom: 10
            }
          );

          this.props.coordinateSet &&
            Object.keys(this.props.coordinateSet).map(key => {
              const zoneObj = this.props.coordinateSet[key];
              let zoneCoordinates = [];

              zoneObj.coordinates.forEach(c => {
                let splitCoord = c.split(",");
                const lat = Number(splitCoord[0]);
                const long = Number(splitCoord[1]);
                zoneCoordinates.push(new google.maps.LatLng(lat, long));
              });

              let zoneShape = new google.maps.Polygon({
                paths: zoneCoordinates,
                draggable: false,
                editable: false,
                strokeColor: zoneObj.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: zoneObj.color,
                fillOpacity: 0.9,
                zoneTitle: zoneObj.name
              });

              zoneShape.setMap(map);
            });

          // CONSTRUCT POLYGON
          // NOTE: We'd run this block of code for each group of zone pulled in from the db..

          // var aNewShapeCoords = [];
          // this.props.currentCoordinateSet &&
          //   this.props.currentCoordinateSet.forEach(c => {
          //     let splitCoord = c.split(",");
          //     const lat = Number(splitCoord[0]);
          //     const long = Number(splitCoord[1]);
          //     aNewShapeCoords.push(new google.maps.LatLng(lat, long));
          //   });

          // let aNewShape = new google.maps.Polygon({
          //   paths: aNewShapeCoords,
          //   draggable: false,
          //   editable: true,
          //   strokeColor: "#000000",
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: zoneColor,
          //   fillOpacity: 0.9,
          //   zoneTitle: "Zone 1"
          // });

          aNewShape.setMap(map);
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
      this.selectedShape.setEditable(false);
    }

    shape.setEditable(true);
    this.selectedShape = shape;
  }

  _handleDeleteZone() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedShape = null;
    }

    this.props.deleteCoordinates();
  }

  _getPolygonCoords = function(newShape) {
    var len = newShape.getPath().getLength();

    let coordArray = [];

    for (var i = 0; i < len; i++) {
      coordArray.push(
        newShape
          .getPath()
          .getAt(i)
          .toUrlValue(6)
      );
    }

    console.log("COORD ARRAY", coordArray);
    this.props.saveCoordinates(coordArray);
  };

  render() {

    console.log("mapzonesreadonly.js", this.props.highlightedZones)

    return (
      <div className="w-100p">
      map should go here, but data isn't rehydrating
        <div
          style={{
            height: this.props.height,
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
          id={this.props.id}
        >
          <div className="input-wrap m-b-20">
            <label>... LOADING MAP ...</label>
          </div>
          <Spin />
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ highlightedZones }) => {
  return { highlightedZones };
};

export default connect(mapStateToProps)(MapZonesReadOnly);
