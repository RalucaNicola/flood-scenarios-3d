/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { action, makeAutoObservable, makeObservable, observable, reaction } from "mobx";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";


class SceneStore {
    view1: __esri.SceneView | null = null;
    view2: __esri.SceneView | null = null;
    viewsLoaded: boolean = false;

    constructor() {
        makeObservable(this, {
            view1: observable,
            view2: observable,
            setView1: action,
            setView2: action,
            viewsLoaded: observable,
            setViewsLoaded: action
        });

        reaction(
            () => this.view1 && this.view2,
            (bothViewsReady) => {
                if (bothViewsReady) {
                    this.setViewsLoaded();
                    this.syncViews();
                }
            }
        );
    }

    setViewsLoaded() {
        this.viewsLoaded = true;
    }

    setView1(view: __esri.SceneView) {
        this.view1 = view;
    }

    setView2(view: __esri.SceneView) {
        this.view2 = view;
    }

    syncViews() {
        _syncViews(this.view1, this.view2);
        _syncViews(this.view2, this.view1);
    }
}

const sceneStore = new SceneStore();
export default sceneStore;

function _syncViews(view1: __esri.SceneView, view2: __esri.SceneView) {
    let viewpointWatchHandle : __esri.WatchHandle;
    let viewStationaryHandle: __esri.Handle;
    let interactWatcher;
    let scheduleId: NodeJS.Timeout;

    function clear() {
      viewpointWatchHandle && viewpointWatchHandle.remove();
      viewStationaryHandle && viewStationaryHandle.remove();
      scheduleId && clearTimeout(scheduleId);
      viewpointWatchHandle = viewStationaryHandle = scheduleId = null;
    }

    interactWatcher = reactiveUtils.watch(() => view1.interacting || view1.animation, function(newValue: boolean | __esri.ViewAnimation) {
      if (!newValue) {
        return;
      }

      if (viewpointWatchHandle || scheduleId) {
        return;
      }

      scheduleId = setTimeout(function() {
        scheduleId = null;
        viewpointWatchHandle = reactiveUtils.watch(() => view1.viewpoint,
          function(newValue: __esri.Viewpoint) {
            view2.viewpoint = newValue;
          });
      }, 0);

      viewStationaryHandle = reactiveUtils.when(() => view1.stationary,
        clear);

    });
}