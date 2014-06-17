/*
Copyright (c) 2014 Institut d'Estadistica de Catalunya (Idescat)
http://www.idescat.cat (https://github.com/idescat/visual)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

VisualJS.setup={ //Simplified and customized from Idescat's setup
	//Colors for maps and series
	colors: {
		map: {
			max: 100,
			base: "#12180a"
		},
		series: ["#2b527b", "#a52a2a", "#008000", "#ffbf00"]	
	},
	//Default options (They can be dynamically modified thru visual().)
	canvas: {
		unit : {
			label: "", 
			symbol: "",
			position: "end"
		},
		legend: true,
		grid: {
			width: 0
		}, //grid width
		axis: { //show axes?
			x: true,
			y: true
		},
		dec: null, //Show only needed decimals (remove ending zeros) unless (recommended) valid dec has been specified by user
		autoheading: true,
		range: {
			//Quantile. No filtering: 0
			cmap: 0.05, //Used in color assignation in maps

			//Multiplier. No filtering: 1
			rank: 1.02, //Increase area horizontally by 2% of the longest bar
			pyram: 1.02 //Increase area horizontally by 2% of the longest bar
		}
	},

	//Internationalization options
	i18n: {
		lang: "en", //default lang when no lang is specified
		text: {
			dec: { //decimal separator
				en:  "."
			},
			k: { //thousands separator
				en:  ","
			},
			month: { //Month axis labels
				en:  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			quarter: { //Quarter axis labels
				en:  ["Q1", "Q2", "Q3", "Q4"]
			},
			na: { //text in tooltip when value is not available 
				en:  "Value not available"
			},
			oldbrowser: { //Warning message when IE<9 (maps)
				en:  "To view the map you must use a modern browser."
			}
		}
	},

	//Classes and ids of elements created by visual
	id: "visual", //id to style the container
	clas: "visual", //class to style the container
	compareids: ["VisualJSleft", "VisualJSright"], //ids to style each VisualJS.compare containers
	tooltipid: "VisualJSTooltip", //id to style the tooltip
	nowrapclass: "VisualJSnw", //class to define blocks of wrappable content in the title
	canvasclass: "VisualJScanvas", //canvas container (Flot)
	areaclass: "VisualJSarea", //svg:g class (D3 maps)
	legendclass: "VisualJSlegend", //svg:g class (D3 maps)
	normal: "VisualJSnormal", //visualitzation's normal size class
	mini: "VisualJSmini", //visualitzation's small size class
	colorclassprefix: "c", //prefix for color class in maps: c0, c1, c2...

	//Markup created by visual
	html: {
		heading: "h1",
		footer: "p" //"footer" element not supported by IE8
	},

	//Libraries: path and existence function
	main: { //Do not use relative paths for main files in production: they'll be relative to the path where VisualJS.iframe is executed.
		visual: "visual.js",
		setup: "visual.setup.js",
		lazy: "lazyload.js"
	},
	lib: {
		d3: {
			js: "libs/d3.v3.min.js",
			exists: function(){ return typeof d3==="object"; },
		},
		maps: {
			js: "libs/visual/visual.maps.js",
			exists: function(){ return typeof VisualJS.func.colors==="function" && typeof VisualJS.func.legend==="function";}
		}
	},

	//Maps: path and existence function
	map: {
		kommune: {
			js: "libs/visual/nor2013kommune.js",
			exists: function(){ return typeof VisualJS.map.kommune!=="undefined" && VisualJS.map.kommune.id==="kommnr"; }
		}		
	},

	//IE check
	func: {
		old: function(ie) { return RegExp("(^|\\s)lt-"+ie+"(\\s|$)").test(document.documentElement.className); }
	},

	//Margins and paddings used in container
	margin: 10,
	padding: {
		w: 30,
		h: 45
	},
	//VisualJS.compare separator width
	separator: 4
};