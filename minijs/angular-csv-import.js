"use strict";var csvImport=angular.module("ngCsvImport",[]);csvImport.directive("ngCsvImport",function(){return{restrict:"E",transclude:!0,replace:!0,scope:{content:"=",header:"=",headerVisible:"=",separator:"=",result:"="},template:'<div><div ng-show="header && headerVisible"><div class="label">Header</div><input type="checkbox" ng-model="header"></div><div ng-show="separator" ><div class="label">Seperator</div><input type="text" ng-change="changeSeparator" ng-model="separator"></div><div><input class="btn cta gray" type="file"/></div></div>',link:function(e,r){r.on("keyup",function(r){if(null!=e.content){var a={csv:e.content,header:e.header,separator:r.target.value};e.result=t(a),e.$apply()}}),r.on("change",function(r){var a=new FileReader;if(a.onload=function(r){e.$apply(function(){var a={csv:r.target.result,header:e.header,separator:e.separator};e.content=a.csv,e.result=t(a)})},"file"!==r.target.type||null==r.target.files&&null==r.srcElement.files){if(null!=e.content){var n={csv:e.content,header:!e.header,separator:e.separator};e.result=t(n)}}else a.readAsText((r.srcElement||r.target).files[0])});var t=function(e){var r=e.csv.split("\n"),t=[],a=0,n=r[0].split(e.separator).length,s=[];e.header&&(s=r[0].split(e.separator),a=1);for(var l=a;l<r.length;l++){var i={},o=r[l].split(e.separator);if(o.length===n){if(e.header)for(var c=0;c<s.length;c++)i[s[c]]=o[c];else for(var p=0;p<o.length;p++)i[p]=o[p];t.push(i)}}return JSON.stringify(t)}}}});