/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

console.log("Try npm run lint/fix!");

const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut aliquet diam.';

const trailing = 'Semicolon'

			const why={am:'I tabbed?'};

const iWish = "I didn't have a trailing space..."; 

const sicilian = true;;

const vizzini = (!!sicilian) ? !!!sicilian : sicilian;

const re = /foo   bar/;

export function doSomeStuff(withThis: string, andThat: string, andThose: string[]) {
    //function on one line
    if(!Boolean(andThose.length)) {return false;}
    console.log(withThis);
    console.log(andThat);
    console.dir(andThose);
    console.log(longString, trailing, why, iWish, vizzini, re);
    return;
}
// TODO: more examples
