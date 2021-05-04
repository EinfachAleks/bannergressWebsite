/* eslint-disable @typescript-eslint/no-unused-vars */
import { divIcon, LatLng, point } from 'leaflet'
import React, { Fragment } from 'react'
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
} from 'react-leaflet'

import { Banner, NumDictionary } from '../../features/banner'
import { mapMissions, Mission } from '../../features/mission'

import './map.less'

// set to null if all missions should be rendered
const missionsToShow = 6
const showMissionStartPointsOnMap = (missions: NumDictionary<Mission>) => {
  const missionStartPoints: Array<JSX.Element> = []
  let color = '#6832da'
  let startLat = 0
  let startLng = 0
  mapMissions(missions, (mission) => {
    if (mission && mission?.steps!) {
      // get the first available waypoint in the mission and set it as start point
      for (let i = 0; i < mission.steps.length; i += 1) {
        if (mission.steps[i].poi?.latitude && mission.steps[i].poi?.latitude) {
          startLat = mission.steps[i].poi!.latitude
          startLng = mission.steps[i].poi!.longitude
          break
        }
      }
      // change color temporary to visualize hidden missions
      if (mission.type === 'hidden') {
        color = 'green'
      } else {
        color = '#6832da'
      }

      // preparation for using e.g. an icon as a marker
      // const icon = divIcon({
      //   className: 'custom-div-icon',
      //   html:
      //     "<div style='background-color:#4838cc;' class='marker-pin'>&#128065</div><i class='fas fa-eye-slash awesome'>",
      //   iconSize: [30, 42],
      //   iconAnchor: [15, 42],
      // })

      missionStartPoints.push(
        <CircleMarker
          key={mission.id}
          pathOptions={{
            fillColor: color,
            fillOpacity: 1,
            fill: true,
            stroke: false,
          }}
          radius={7}
          center={[startLat, startLng]}
        >
          <Tooltip permanent>{mission.title}</Tooltip>
        </CircleMarker>
        // <Marker key={mission.id} icon={icon} position={[startLat, startLng]} />
      )
    }
  })
  // const forVariable = missionsToShow ?? numberOfMissions
  // for (let i = 0; i < forVariable; i += 1) {
  //   if (missions[i] !== undefined) {
  //     const { steps } = missions[i]
  //     if (steps) {
  //       missionStartPoints.push(
  //         <CircleMarker
  //           pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 1 }}
  //           radius={5}
  //           center={[steps[0].poi.latitude, steps[0].poi.longitude]}
  //         >
  //           <Tooltip permanent>{missions[i].title}</Tooltip>
  //         </CircleMarker>
  //       )
  //     }
  //   }
  // }
  return missionStartPoints
}

const showMissionRoutesOnMap = (missions: NumDictionary<Mission>) => {
  // eslint-disable-next-line no-debugger
  // debugger
  // console.log('showMissionRoutesOnMap', numberOfMissions)
  let missionPolylinesTemp: LatLng[] = []
  const missionPolylines: Array<JSX.Element> = []
  mapMissions(missions, (mission) => {
    if (mission) {
      const { steps } = mission
      if (steps) {
        steps.forEach((step) => {
          if (step.poi && step.poi.latitude && step.poi.longitude) {
            missionPolylinesTemp.push(
              new LatLng(step.poi.latitude, step.poi.longitude)
            )
          }
        })
      }
      // defines lineStyle based on the mission type
      let lineStyle
      if (mission.type === 'anyOrder')
        lineStyle = {
          color: '#6832da',
          dashArray: '10, 10',
        }
      if (mission.type === 'sequential')
        lineStyle = {
          color: '#6832da',
        }
      missionPolylines.push(
        <Polyline
          key={`steps-${mission.id}`}
          pathOptions={lineStyle}
          positions={missionPolylinesTemp}
        />
      )
      missionPolylinesTemp = []
      // console.log('missionPolylinesTemp', missionPolylinesTemp)
      // eslint-disable-next-line no-debugger
      // debugger
    }
  })
  return missionPolylines
}

export const MapDetail: React.FC<MapDetailProps> = ({ banner }) => (
  <Fragment>
    <MapContainer
      center={[banner?.startLatitude, banner?.startLongitude]}
      zoom={12}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
      />
      {banner?.missions ? showMissionStartPointsOnMap(banner?.missions) : null}

      {banner?.missions ? showMissionRoutesOnMap(banner?.missions) : null}
    </MapContainer>
  </Fragment>
)

export interface MapDetailProps {
  banner: Banner
}
