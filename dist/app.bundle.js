module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("express")},function(e,t,n){"use strict";var r=d(n(1)),o=d(n(3)),i=d(n(4)),s=d(n(5)),a=d(n(6)),l=d(n(0)),u=d(n(7));function d(e){return e&&e.__esModule?e:{default:e}}const c=(0,r.default)();c.use((0,a.default)()),c.use((0,i.default)({filter:function(e,t){if(e.headers["x-no-compression"])return!1}}));c.use((0,o.default)("combined")),c.use("/uploads",r.default.static("uploads")),c.use(s.default.json()),c.use(s.default.urlencoded({extended:!1})),c.set("view engine","pug"),c.set("views",u.default.join(__dirname,"../views"));let p="mongodb://manuhdez:cv-mobile-api-2018@ds225703.mlab.com:25703/cv-mobile-api";console.log("production",p),l.default.connect(p,{useNewUrlParser:!0});const y=l.default.connection;y.on("error",e=>{console.error("Mongodb connection error:",e)}),y.on("open",()=>{console.log("Mongodb connected successfully")}),c.use((e,t,n)=>{if(t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),"OPTIONS"===e.method)return t.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE"),t.status(200).json({});n()}),c.get("/",(e,t)=>{t.render("index")});const f=n(8);c.use("/api",f),c.use((e,t,n)=>{const r=new Error("Page not found");return r.status=404,n(r)}),c.use((e,t,n,r)=>{n.status(e.status||500),n.json({error:e.message})});const m=process.env.PORT||3e3;c.listen(m,e=>{e?process.exit(e):console.log(`App listening on 'http://localhost:${m}'...\n           ---\n           Running on production\n           ---\n      `)})},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}const o=n(1).Router(),i=n(9),s=i({storage:i.diskStorage({destination:function(e,t,n){n(null,"uploads/")},filename:function(e,t,n){n(null,(new Date).toISOString().replace(/:/g,"_")+t.originalname)}}),limits:{fileSize:3145728},fileFilter:function(e,t,n){"image/jpeg"===t.mimetype||"image/png"===t.mimetype?n(null,!0):n(new Error("Not a valid file format"),!1)}}),a=n(10),l=n(11),u=n(12),d=n(13);o.get("/",(e,t,n)=>t.json({message:"This is the api endpoint"})),o.get("/users",(e,t,n)=>{a.find().then(e=>t.json(e))}),o.get("/users/pages/:pageId",(e,t,n)=>{a.find().skip(10*(e.params.pageId-1)).limit(10).then(e=>t.json(e))}),o.post("/users",s.single("profilePicture"),(e,t,n)=>{if(e.body.name&&e.body.email&&e.body.username){const r={name:e.body.name,username:e.body.username,email:e.body.email,gender:e.body.gender,location:{city:e.body.city,state:e.body.state,country:e.body.country},company:e.body.company,jobTitle:e.body.jobTitle,website:e.body.website,birthDate:e.body.birthDate,experience:e.body.experience,languages:JSON.parse(e.body.languages),skills:JSON.parse(e.body.skills),registeredDate:Date.now()};e.file&&void 0!==e.file?r.profilePicture=`${e.protocol}://${e.hostname}/${e.file.path}`:void 0===e.file&&(r.profilePicture=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`),a.create(r,function(e,r){return e?n(e):t.json(r)})}else t.json({error:"Not all required data was sent"})}),o.get("/users/:id",(e,t,n)=>{a.findById(e.params.id,function(e,r){if(e)return n(e);if(!r){const e=new Error("User not found");return e.status=404,n(e)}t.json(r)})}),o.put("/users/:id",s.single("profilePicture"),(e,t,n)=>{const r={name:e.body.name,username:e.body.username,email:e.body.email,gender:e.body.gender,location:{city:e.body.city,state:e.body.state,country:e.body.country},company:e.body.company,jobTitle:e.body.jobTitle,website:e.body.website,birthDate:e.body.birthDate,experience:e.body.experience,languages:JSON.parse(e.body.languages),skills:JSON.parse(e.body.skills)};e.file&&(r.profilePicture=`${e.protocol}://${e.hostname}/${e.file.path}`),a.findByIdAndUpdate(e.params.id,r,function(e,o){if(e)return n(e);t.json(r)})}),o.delete("/users/:id",(e,t,n)=>{a.findByIdAndRemove(e.params.id,function(e){if(e)return n(e);t.json({message:"The user was successfully removed"})})}),o.get("/company",(e,t,n)=>{l.find().then(e=>t.json(e))}),o.get("/company/:id",(e,t,n)=>{l.findById(e.params.id,function(e,r){if(e)return n(e);if(!r){const e=new Error("Company not found");return e.status=404,n(e)}t.json(r)})}),o.post("/company",s.single("logoURL"),(e,t,n)=>{if(e.body.name&&e.body.email&&e.body.CIF&&e.body.country){let{name:r,CIF:o,email:i,website:s,country:a,street:u,city:d,zipcode:c,socialUrls:p,bio:y,employees:f,phone:m}=e.body;const g={name:r,CIF:o,email:i,website:s,address:{country:a,street:u,city:d,zipcode:c},socialUrls:p,bio:y,employees:f,phone:m,registeredDate:Date.now()};if(e.file){process.env.PORT;g.logoURL=`${e.protocol}://${e.hostname}/${e.file.path}`}l.create(g,(e,r)=>e?n(e):t.json(r))}else t.json({error:"Not all required data was sent"})}),o.put("/company/:id",s.single("logoURL"),(e,t,n)=>{l.findById(e.params.id,(o,i)=>{if(o)return n(o);if(!i){const e=new Error("The user your trying to modify does not exist.");return e.status=404,n(e)}let s=e.body,{country:a,city:u,street:d,zipcode:c}=s,p=r(s,["country","city","street","zipcode"]),y={country:void 0!==a?a:i.address.country,city:void 0!==u?u:i.address.city,street:void 0!==d?d:i.address.street,zipcode:void 0!==c?c:i.address.zipcode},f=Object.assign({},p,{address:Object.assign({},y)});if(e.file){process.env.PORT;f.logoURL=`${e.protocol}://${e.hostname}/${e.file.path}`}l.findByIdAndUpdate(e.params.id,f,(e,r)=>e?n(e):t.json({status:"Success",fieldsUpdated:f}))})}),o.delete("/company/:id",(e,t,n)=>{l.findByIdAndDelete(e.params.id,e=>{if(e)return n(e);t.json({message:"Company profile succesfully deleted."})})}),o.get("/langs",(e,t,n)=>{d.find().then(e=>t.json(e))}),o.post("/langs",(e,t,n)=>{let r=Object.assign({},e.body);if(r.name&&r.label&&r.value&&"number"==typeof r.default){let e={name:r.name,label:r.label,value:r.value,default:r.default};d.create(e,(e,r)=>e?n(e):t.json(r))}}),o.delete("/langs/:id",(e,t,n)=>{d.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"Language successfully deleted."}))}),o.get("/skills",(e,t,n)=>{u.find().then(e=>t.json(e))}),o.post("/skills",(e,t,n)=>{let{name:r,value:o,label:i}=e.body;if(r&&o&&i){let e={name:r,value:o,label:i};u.create(e,(e,r)=>e?n(e):t.json(r))}}),o.delete("/skills/:id",(e,t,n)=>{u.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"The skill was removed successfully"}))}),e.exports=o},function(e,t){e.exports=require("multer")},function(e,t,n){"use strict";const r=n(0),o=new(0,r.Schema)({name:{type:String,required:!0},username:{type:String,required:!0},email:{type:String,unique:!0,required:!0},gender:String,location:{type:Object},company:String,jobTitle:String,languages:Array,skills:Array,experience:String,birthDate:Date,website:{type:String,trim:!0},profilePicture:{type:String,trim:!0},registeredDate:Number}),i=r.model("User",o);e.exports=i},function(e,t,n){"use strict";const r=n(0),o=new(0,r.Schema)({name:{type:String,required:!0,unique:!0},CIF:{type:Number,required:!0,unique:!0},email:{type:String,required:!0,unique:!0,trim:!0},website:{type:String,trim:!0},address:{country:{type:String,required:!0},street:{type:String},city:{type:String},zipcode:{type:Number}},socialUrls:{type:Object},logoURL:{type:String,required:!0,trim:!0},bio:{type:String},employees:{type:Number},phone:{type:Number},registeredDate:{type:Number}}),i=r.model("Company",o);e.exports=i},function(e,t,n){"use strict";const r=n(0),o=new(0,r.Schema)({name:{type:String,required:!0},value:{type:String,required:!0},label:{type:String,required:!0}}),i=r.model("Skill",o);e.exports=i},function(e,t,n){"use strict";const r=n(0),o=new(0,r.Schema)({name:{type:String,required:!0},label:{type:String,required:!0},value:{type:String,required:!0},default:{type:Number,required:!0}}),i=r.model("Language",o);e.exports=i}]);