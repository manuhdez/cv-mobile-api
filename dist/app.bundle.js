module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("mongoose")},function(e,t,n){"use strict";const r=n(0),a=r.Schema,o=new a({name:{type:String,required:!0,unique:!0},docType:{type:String,required:!0},docNumber:{type:String,required:!0,unique:!0},email:{type:String,required:!0,unique:!0,trim:!0},website:{type:String,trim:!0,unique:!0},address:{country:{type:String,required:!0},street:{type:String},city:{type:String},zipcode:{type:Number}},socialUrls:[{platform:String,url:String}],logo:{type:String,trim:!0},bio:{type:String},employees:{type:Number},phone:{type:String},registeredDate:{type:Date,default:Date.now},jobOffers:[{type:a.Types.ObjectId,ref:"JobOffer"}]}),i=r.model("Company",o);e.exports=i},function(e,t){e.exports=require("express")},function(e,t,n){"use strict";const r=n(0),a=r.Schema,o=new a({name:{type:String,required:!0},username:{type:String,required:!0},email:{type:String,unique:!0,required:!0},phone:{type:String,unique:!0},gender:String,address:{country:{type:String,required:!0},city:{type:String},street:{type:String},zipcode:{type:Number}},company:String,jobTitle:String,languages:[{type:[a.Types.ObjectId],ref:"Language"}],skills:[{type:[a.Types.ObjectId],ref:"Skill"}],experience:String,birthDate:Date,website:{type:String,trim:!0,unique:!0},avatar:{type:String,trim:!0},registeredDate:{type:Date,default:Date.now}}),i=r.model("User",o);e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=new r.default.Schema({companyEmail:{type:String,required:!0,trim:!0},title:{type:String,required:!0},position:{type:String,required:!0},vacancies:{type:Number,required:!0},description:String,publicationDate:{type:Date,default:Date.now}}),o=r.default.model("JobOffer",a);t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=r.default.Schema,o=new a({origin:{type:a.Types.ObjectId,ref:"Survey",required:!0},originTitle:{type:String,required:!0},totalAnswers:Number,answers:[{question:String,options:[{value:{type:String,required:!0},count:Number}]}]}),i=r.default.model("Summary",o);t.default=i},function(e,t,n){"use strict";var r=c(n(2)),a=c(n(7)),o=c(n(8)),i=c(n(9)),s=c(n(10)),l=c(n(0)),d=c(n(11)),u=c(n(12));function c(e){return e&&e.__esModule?e:{default:e}}const f=(0,r.default)();f.use((0,s.default)()),f.use((0,d.default)("UA-127831712-2")),f.use((0,o.default)({filter:function(e,t){if(e.headers["x-no-compression"])return!1}}));f.use((0,a.default)("combined")),f.use("/uploads",r.default.static("uploads")),f.use(i.default.json()),f.use(i.default.urlencoded({extended:!1}));let p="mongodb://manuhdez:cv-mobile-api-2018@ds225703.mlab.com:25703/cv-mobile-api";console.log("production",p),l.default.connect(p,{useNewUrlParser:!0});const m=l.default.connection;m.on("error",e=>{console.error("Mongodb connection error:",e)}),m.on("open",()=>{console.log("Mongodb connected successfully")}),f.use((e,t,n)=>{if(t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),"OPTIONS"===e.method)return t.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE"),t.status(200).json({});n()}),f.get("/",(e,t)=>{t.redirect("/docs")}),f.get("/docs",(e,t)=>{t.sendfile("views/docs.html")}),f.use("/api",u.default),f.use((e,t,n)=>{const r=new Error("Page not found");return r.status=404,n(r)}),f.use((e,t,n,r)=>{n.status(e.status||500),n.json({error:e.message})});const g=process.env.PORT||3e3;f.listen(g,e=>{e?process.exit(e):console.log(`App listening on 'http://localhost:${g}'...\n           ---\n           Running on production\n           ---\n      `)})},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("express-ga-middleware")},function(e,t,n){"use strict";var r=p(n(2)),a=p(n(13)),o=p(n(14)),i=p(n(15)),s=p(n(17)),l=p(n(19)),d=p(n(20)),u=p(n(21)),c=p(n(23)),f=p(n(24));function p(e){return e&&e.__esModule?e:{default:e}}const m=r.default.Router(),g=a.default.diskStorage({destination:function(e,t,n){"user"===e.params.type?n(null,"uploads/avatars"):"company"===e.params.type&&n(null,"uploads/logos")},filename:function(e,t,n){let r=`.${t.mimetype.split("/")[1]}`;n(null,e.params.id+r)}}),y=(0,a.default)({storage:g,limits:{fileSize:3145728},fileFilter:function(e,t,n){"image/jpeg"===t.mimetype||"image/png"===t.mimetype?n(null,!0):n(new Error("Not a valid file format"),!1)}});m.get("/",(e,t,n)=>t.json({welcome:"There is a list with useful links",links:{users:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/users`,skills:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/skills`,languages:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/langs`,companies:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/companies`,job_offers:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/offers`,surveys:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/surveys`,summaries:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/summaries`}})),m.get("/users",o.default.getAll),m.post("/users",o.default.add),m.get("/users/pages/:pageId",o.default.getPage),m.get("/users/:id",o.default.getById),m.put("/users/:id",o.default.update),m.delete("/users/:id",o.default.delete),m.get("/langs",i.default.getAll),m.post("/langs",i.default.add),m.get("/langs/:id",i.default.getById),m.delete("/langs/:id",i.default.delete),m.get("/skills",s.default.getAll),m.post("/skills",s.default.add),m.get("/skills/:id",s.default.getById),m.delete("/skills/:id",s.default.delete),m.get("/companies",l.default.getAll),m.post("/companies",l.default.add),m.get("/companies/:id",l.default.getById),m.put("/companies/:id",l.default.update),m.delete("/companies/:id",l.default.delete),m.get("/offers",d.default.get),m.post("/offers",d.default.add),m.get("/offers/:id",d.default.getById),m.delete("/offers/:id",d.default.delete),m.get("/surveys",u.default.get),m.post("/surveys",u.default.add),m.delete("/surveys/:id",u.default.delete),m.get("/summaries",c.default.get),m.get("/summaries/:origin",c.default.getByOrigin),m.post("/files/upload/:type/:id",y.single("img"),f.default.uploadFile),e.exports=m},function(e,t){e.exports=require("multer")},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(3));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getPage=((e,t,n)=>{r.default.find().skip(10*(e.params.pageId-1)).limit(10).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{name:a,username:o,email:i,phone:s,gender:l,address:d,company:u,jobTitle:c,website:f,birthDate:p,experience:m,languages:g,skills:y}=e.body,h=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`;if(a&&i&&o&&d.country){const e={name:a,username:o,email:i,phone:s,gender:l,address:d,company:u,jobTitle:c,website:f,birthDate:p,experience:m,languages:g,skills:y,avatar:h};r.default.create(e,function(e,r){return e?n(e):t.json(r)})}else t.json({error:"Name, username, email and country properties are required."})}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).populate("skills").populate("languages").exec((e,r)=>{if(e)return n(e);t.json(r)})}),t.update=((e,t,n)=>{let a=Object.assign({},e.body);r.default.findByIdAndUpdate(e.params.id,a,{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)})}),t.delete=((e,t,n)=>{r.default.findByIdAndRemove(e.params.id,e=>{if(e)return n(e);t.redirect("/api/users/")})})},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(16));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{label:a}=e.body;a&&r.default.create({label:a},(e,r)=>e?n(e):t.json(r))}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"Language successfully deleted."}))})},function(e,t,n){"use strict";const r=n(0),a=new(0,r.Schema)({label:{type:String,required:!0,unique:!0}}),o=r.model("Language",a);e.exports=o},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(18));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{type:a,label:o}=e.body;if(a&&o){let e={type:a,label:o};r.default.create(e,(e,r)=>e?n(e):t.json(r))}}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"The skill was removed successfully"}))})},function(e,t,n){"use strict";const r=n(0),a=new(0,r.Schema)({type:{type:String,required:!0},label:{type:String,required:!0}}),o=r.model("Skill",a);e.exports=o},function(e,t,n){"use strict";var r=o(n(1)),a=o(n(4));function o(e){return e&&e.__esModule?e:{default:e}}t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).populate("jobOffers").then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{name:a,docType:o,docNumber:i,email:s,website:l,address:d,socialUrls:u,bio:c,employees:f,phone:p,jobOffers:m}=e.body,g=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`;if(a&&s&&o&&i&&d.country){const e={name:a,docType:o,docNumber:i,email:s,website:l,address:d,socialUrls:u,bio:c,employees:f,phone:p,jobOffers:m,logo:g};r.default.create(e,(e,r)=>e?n(e):t.json(r))}else t.json({error:"Not all required data was sent"})}),t.update=((e,t,n)=>{let o=Object.assign({},e.body);r.default.findByIdAndUpdate(e.params.id,o).exec((e,r)=>{if(e)return n(e);o.email&&a.default.update({companyEmail:r.email},{companyEmail:o.email}).then(()=>t.json(r)).catch(e=>n(e)),t.json(r)})}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,(e,r)=>{if(e)return n(e);a.default.deleteMany({companyEmail:r.email}).then(()=>t.redirect("/api/companies")).catch(e=>n(e))})})},function(e,t,n){"use strict";var r=o(n(4)),a=o(n(1));function o(e){return e&&e.__esModule?e:{default:e}}t.get=((e,t)=>{r.default.find().then(e=>t.json(e)).catch(e=>next(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{title:o,position:i,vacancies:s,description:l,companyEmail:d}=e.body;const u={title:o,position:i,vacancies:s,description:l,companyEmail:d};a.default.find({email:d}).then(e=>{if(console.log("doc: ",e.length),0===e.length)return t.json({message:"Please use an existing company email"});r.default.create(u,(e,r)=>{if(e)return n(e);a.default.findOneAndUpdate({email:d},{$push:{jobOffers:r._id}}).then(()=>t.json(r)).catch(e=>n(e))})}).catch(e=>n(e))}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,(e,r)=>{if(e)return n(e);a.default.findOneAndUpdate({email:r.companyEmail},{$pull:{jobOffers:r._id}}).then(e=>t.redirect(`/api/companies/${e._id}`)).catch(e=>n(e))})})},function(e,t,n){"use strict";var r=o(n(22)),a=o(n(5));function o(e){return e&&e.__esModule?e:{default:e}}t.get=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{header:o,elements:i}=e.body,s={header:o,elements:i};r.default.create(s,(e,r)=>{if(e)return n(e);a.default.create({origin:r._id,originTitle:r.header.title,totalAnswers:0,answers:[]},e=>e?n(e):t.json(r))})}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,r=>{if(r)return n(r);a.default.findOneAndDelete({origin:e.params.id}).then(()=>t.json({message:"Survey entry successfully removed"})).catch(e=>n(e))})})},function(e,t,n){"use strict";const r=n(0),a=new(0,r.Schema)({header:{title:{type:String,required:!0},subtitle:{type:String},startDate:{type:Date,default:Date.now},endDate:{type:Date,required:!0},description:{type:String,required:!0}},elements:[{type:{type:String,required:!0},label:{type:String,required:!0},name:{type:String,required:!0},values:[{label:{type:String,required:!0},value:{type:String,required:!0}}]}]}),o=r.model("Survey",a);e.exports=o},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(5));t.get=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getByOrigin=((e,t,n)=>{console.log(e.params.origin),r.default.find({origin:e.params.origin}).populate("origin").then(e=>t.json(e)).catch(e=>n(e))})},function(e,t,n){"use strict";var r=i(n(25)),a=i(n(3)),o=i(n(1));function i(e){return e&&e.__esModule?e:{default:e}}t.uploadFile=((e,t,n)=>{let{type:i,id:s}=e.params,l={model:s,type:i};e.file&&(l.url=`${e.protocol}://${e.hostname}/${e.file.path}`),r.default.deleteOne({model:s}).then(()=>{r.default.create(l,(e,r)=>{if(e)return n(e);"user"===i?a.default.findByIdAndUpdate(s,{avatar:r.url},{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)}):"company"===i&&o.default.findByIdAndUpdate(s,{logo:r.url},{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)})})}).catch(e=>t.json(e))})},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=new(0,r.default.Schema)({url:String,type:String,model:String}),o=r.default.model("File",a);e.exports=o}]);