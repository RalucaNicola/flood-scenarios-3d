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

import { ErrorAlert } from '../ErrorAlert';
import { Identity } from '../Identity';
import { SwipeSceneView } from '../SwipeSceneView'
import { Navigation } from '../Navigation';

import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/calcite/calcite.css";

export default function App() {

  return (
    <>
    <calcite-shell>
      <Navigation></Navigation>
      <SwipeSceneView></SwipeSceneView>
      <Identity></Identity>
      <ErrorAlert></ErrorAlert>
    </calcite-shell>  
    </>
  );
}
