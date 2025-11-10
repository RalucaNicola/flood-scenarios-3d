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


class SceneStore {
    view1: __esri.SceneView | null = null;
    view2: __esri.SceneView | null = null;
    viewsLoaded: boolean = false;

    constructor() {
        makeObservable(this, {
            viewsLoaded: observable,
            setViewsLoaded: action
        });
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
}

const sceneStore = new SceneStore();
export default sceneStore;