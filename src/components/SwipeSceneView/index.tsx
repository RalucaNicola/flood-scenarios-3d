import { mapConfig } from "../../config";

import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-navigation-toggle";
import "@arcgis/map-components/components/arcgis-compass";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { observer } from "mobx-react-lite";
import sceneStore from "../../stores/sceneStore";
import styles from "./SwipeSceneView.module.css";
import { useEffect, useState } from "react";

export const SwipeSceneView = observer(() => {
  const [swipePositionX, setSwipePositionX] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const margin = 30;

  useEffect(() => {
    const onResize = () => {
      setClientWidth(document.documentElement.clientWidth);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    setSwipePositionX(clientWidth/2);
  }, [clientWidth]);

  return <>
  {/* bottom webscene  */}
    <div className={styles.containerBottom}>
      <arcgis-scene
        item-id={mapConfig['webscene1']}
        onarcgisViewReadyChange={(event) => {
          sceneStore.setView1(event.target.view);
        }}
        className={styles.viewBottom}
        touch-action="none"
      >
      </arcgis-scene>
    </div>
    {/* top webscene */}
    <div className={styles.containerTop} style={{right: `${clientWidth - swipePositionX}px`}}>
      <arcgis-scene
      className={styles.viewTop}
      touch-action="none"
      item-id={mapConfig['webscene2']}
      onarcgisViewReadyChange={(event) => {
        sceneStore.setView2(event.target.view);
      }}
      >
      </arcgis-scene>
    </div>
    {/* swipe tool  */}
    <div className={styles.swipe} 
      style={{ touchAction: 'none', left: `${swipePositionX}px` }}
      onPointerDown={(evt) => {
      evt.preventDefault();
      
      const handlePointerMove = (e: PointerEvent) => {
        if ((e.clientX > margin) && (e.clientX < clientWidth - margin)) {
          setSwipePositionX(e.clientX);
        }
      };
      
      const handlePointerUp = () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
      
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      }}
    >
      <div className={styles.swiperLeft}></div>
      <div className={styles.swiperRight}></div>
    </div>
  </>
})