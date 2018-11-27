module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({name:{type:String,required:!0},username:{type:String,required:!0},email:{type:String,unique:!0,required:!0},phone:{type:String,unique:!0,sparse:!0},gender:String,address:{country:{type:String,required:!0},city:{type:String},street:{type:String},zipcode:{type:Number}},company:String,jobTitle:String,languages:[{type:[r.Schema.Types.ObjectId],ref:"Language"}],skills:[{type:[r.Schema.Types.ObjectId],ref:"Skill"}],experience:String,birthDate:Date,website:{type:String,trim:!0,unique:!0,sparse:!0},avatar:{type:String,trim:!0},registeredDate:{type:Date,default:Date.now}});t.default=a.default.model("User",s)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({name:{type:String,required:!0,unique:!0},docType:{type:String,required:!0},docNumber:{type:String,required:!0,unique:!0},email:{type:String,required:!0,unique:!0,trim:!0},website:{type:String,trim:!0,unique:!0,sparse:!0},address:{country:{type:String,required:!0},street:{type:String},city:{type:String},zipcode:{type:String}},socialUrls:[{platform:String,url:String}],logo:{type:String,trim:!0},bio:{type:String},employees:{type:Number},phone:{type:String},registeredDate:{type:Date,default:Date.now},jobOffers:[{type:r.Schema.Types.ObjectId,ref:"JobOffer"}]});t.default=a.default.model("Company",s)},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("dotenv")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=new r.default.Schema({companyEmail:{type:String,required:!0,trim:!0},company:String,title:{type:String,required:!0},contractType:{type:String,required:!0},location:{type:String,required:!0},description:String,responsabilities:[String],whatWeOffer:[{title:String,description:String}],whatWeLookFor:[{title:String,description:String}],publishDate:{type:Date,default:Date.now}});t.default=r.default.model("JobOffer",a)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({origin:{type:r.Schema.Types.ObjectId,ref:"Survey",required:!0},title:{type:String,required:!0},totalAnswers:Number,answers:[{question:String,options:[{value:{type:String,required:!0},count:Number}]}]});t.default=a.default.model("Summary",s)},function(e,t,n){"use strict";var r=p(n(4)),a=p(n(9)),s=p(n(10)),o=p(n(11)),u=p(n(12)),l=p(n(0)),i=p(n(13)),d=p(n(14)),c=p(n(15)),f=p(n(16));function p(e){return e&&e.__esModule?e:{default:e}}const m=(0,r.default)();n(5).config(),m.use((0,u.default)()),m.use((0,c.default)()),m.use((0,i.default)("UA-127831712-2")),m.use((0,s.default)({filter:function(e,t){if(e.headers["x-no-compression"])return!1}}));m.use((0,a.default)("combined")),m.use("/uploads",r.default.static("uploads")),m.use(o.default.json()),m.use(o.default.urlencoded({extended:!1}));let g=`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;l.default.connect(g,{useNewUrlParser:!0});const y=l.default.connection;y.on("error",e=>{console.error("Mongodb connection error:",e)}),y.on("open",()=>{console.log("Mongodb connected successfully")}),m.get("/",(e,t)=>{t.redirect("/docs")}),m.get("/docs",(e,t)=>{t.sendfile("views/docs.html")}),m.use("/api",f.default),m.use((e,t,n)=>{const r=new Error("Page not found");return r.status=404,n(r)}),m.use((e,t,n,r)=>{n.status(e.status||500),n.json({error:e.message})});const h=process.env.PORT||3e3;d.default.then(()=>{console.log("CONNECTED TO MONGODB WITH SUCCESS!"),m.listen(h,e=>{e?process.exit(e):console.log(`App listening on 'http://localhost:${h}'...\n           ---\n           Running on production\n           ---\n      `)})}).catch(e=>"AN ERROR HAPPENED ON CONNECTION: "+console.error(e))},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("express-ga-middleware")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));(0,n(5).config)(),r.default.Promise=global.Promise;let a="";a=`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,console.log("MONGO URI: ",a);const s={autoIndex:!1,reconnectTries:Number.MAX_SAFE_INTEGER,reconnectInterval:500,poolSize:10,bufferMaxEntries:0,useNewUrlParser:!0};t.default=r.default.connect(a,s)},function(e,t){e.exports=require("cors")},function(e,t,n){"use strict";var r=m(n(4)),a=m(n(17)),s=(m(n(1)),m(n(18))),o=m(n(19)),u=m(n(21)),l=m(n(23)),i=m(n(24)),d=m(n(25)),c=m(n(27)),f=m(n(28)),p=m(n(30));function m(e){return e&&e.__esModule?e:{default:e}}const g=r.default.Router(),y=a.default.diskStorage({destination:function(e,t,n){"user"===e.params.type?n(null,"uploads/avatars"):"company"===e.params.type&&n(null,"uploads/logos")},filename:function(e,t,n){let r=`.${t.mimetype.split("/")[1]}`;n(null,e.params.id+r)}}),h=(0,a.default)({storage:y,limits:{fileSize:3145728},fileFilter:function(e,t,n){"image/jpeg"===t.mimetype||"image/png"===t.mimetype?n(null,!0):n(new Error("Not a valid file format"),!1)}});g.get("/",(e,t,n)=>t.json({welcome:"There is a list with useful links",links:{users:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/users`,skills:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/skills`,languages:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/langs`,companies:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/companies`,job_offers:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/offers`,surveys:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/surveys`,summaries:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/summaries`}})),g.get("/users",s.default.getAll),g.post("/users",s.default.add),g.get("/users/pages/:pageId",s.default.getPage),g.get("/users/:id",s.default.getById),g.put("/users/:id",s.default.update),g.delete("/users/:id",s.default.delete),g.get("/langs",o.default.getAll),g.post("/langs",o.default.add),g.get("/langs/:id",o.default.getById),g.delete("/langs/:id",o.default.delete),g.get("/skills",u.default.getAll),g.post("/skills",u.default.add),g.get("/skills/:id",u.default.getById),g.delete("/skills/:id",u.default.delete),g.get("/companies",l.default.getAll),g.post("/companies",l.default.add),g.get("/companies/:id",l.default.getById),g.put("/companies/:id",l.default.update),g.delete("/companies/:id",l.default.delete),g.get("/offers",function(e,t,n){const r=e.headers.authorization;if(r){const t=r.split(" ")[1];e.token=t,n()}else t.status(400).json({message:"You are not logged in"})},i.default.get),g.post("/offers",i.default.add),g.get("/offers/:id",i.default.getById),g.delete("/offers/:id",i.default.delete),g.get("/surveys",d.default.get),g.post("/surveys",d.default.add),g.delete("/surveys/:id",d.default.delete),g.get("/summaries",c.default.get),g.get("/summaries/:origin",c.default.getByOrigin),g.put("/summaries/:origin",c.default.updateSummary),g.post("/files/upload/:type/:id",h.single("img"),f.default.uploadFile),g.post("/login",p.default.login),e.exports=g},function(e,t){e.exports=require("multer")},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(2));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.status(200).json(e)).catch(e=>n(e))}),t.getPage=((e,t,n)=>{r.default.find().skip(10*(e.params.pageId-1)).limit(10).then(e=>t.status(200).json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{name:a,username:s,email:o,phone:u,gender:l,address:i,company:d,jobTitle:c,website:f,birthDate:p,experience:m,languages:g,skills:y}=e.body,h=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`;if(a&&o&&s&&i.country){const e={name:a,username:s,email:o,phone:u,gender:l,address:i,company:d,jobTitle:c,website:f,birthDate:p,experience:m,languages:g,skills:y,avatar:h};r.default.create(e,function(e,r){return e?n(e):t.status(200).json(r)})}else t.status(500).json({error:"Name, username, email and country properties are required."})}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).populate("skills").populate("languages").exec((e,r)=>{if(e)return n(e);t.status(200).json(r)})}),t.update=((e,t,n)=>{let a=Object.assign({},e.body);r.default.findByIdAndUpdate(e.params.id,a,{new:!0}).exec((e,r)=>{if(e)return n(e);t.status(200).json(r)})}),t.delete=((e,t,n)=>{r.default.findByIdAndRemove(e.params.id,e=>{if(e)return n(e);t.status(200).json({message:"User successfuly deleted"})})})},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(20));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{label:a}=e.body;a&&r.default.create({label:a},(e,r)=>e?n(e):t.json(r))}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"Language successfully deleted."}))})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({label:{type:String,required:!0,unique:!0}});t.default=a.default.model("Language",s)},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(22));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{type:a,label:s}=e.body;if(a&&s){let e={type:a,label:s};r.default.create(e,(e,r)=>e?n(e):t.json(r))}}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"The skill was removed successfully"}))})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({type:{type:String,required:!0},label:{type:String,required:!0}});t.default=a.default.model("Skill",s)},function(e,t,n){"use strict";var r=s(n(3)),a=s(n(6));function s(e){return e&&e.__esModule?e:{default:e}}t.getAll=((e,t,n)=>{r.default.find().then(e=>t.status(200).json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).populate("jobOffers").then(e=>t.status(200).json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{name:a,docType:s,docNumber:o,email:u,website:l,address:i,socialUrls:d,bio:c,employees:f,phone:p}=e.body,m=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`;if(a&&u&&s&&o&&i.country){const e={name:a,docType:s,docNumber:o,email:u,website:l,address:i,socialUrls:d,bio:c,employees:f,phone:p,jobOffers:[],logo:m};r.default.create(e,(e,r)=>e?n(e):t.status(200).json(r)),r.default.create(e,(e,r)=>e?n(e):t.json(r))}else t.status(401).json({error:"Not all required data was sent"})}),t.update=((e,t,n)=>{let s=Object.assign({},e.body);r.default.findByIdAndUpdate(e.params.id,s).exec((e,r)=>{if(e)return n(e);s.email&&a.default.update({companyEmail:r.email},{companyEmail:s.email}).then(()=>t.status(200).json(r)).catch(e=>n(e)),t.json(r)})}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,(e,r)=>{if(e)return n(e);a.default.deleteMany({companyEmail:r.email}).then(()=>t.status(200).json({message:"Company successfuly deleted"})).catch(e=>n(e))})})},function(e,t,n){"use strict";var r=o(n(6)),a=o(n(3)),s=o(n(1));function o(e){return e&&e.__esModule?e:{default:e}}t.get=((e,t,n)=>{s.default.verify(e.token,"secret_key",(e,a)=>{if(e)return n(e);r.default.find().then(e=>t.status(200).json(e)).catch(e=>n(e))})}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{title:s,contractType:o,location:u,description:l,companyEmail:i,company:d,responsabilities:c,whatWeOffer:f,whatWeLookFor:p}=e.body;const m={companyEmail:i,company:d,title:s,contractType:o,location:u,description:l,responsabilities:c,whatWeOffer:f,whatWeLookFor:p};a.default.find({email:i}).then(e=>{if(0===e.length)return t.json({message:"Please use an existing company email"});r.default.create(m,(e,r)=>{if(e)return n(e);if(!r){const e=new Error("Something went wrong.");return e.status(500),n(e)}a.default.update({email:i},{$push:{jobOffers:r._id}}).then(()=>t.json(r)).catch(e=>n(e))})}).catch(e=>n(e))}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,(e,r)=>{if(e)return n(e);a.default.findOneAndUpdate({email:r.companyEmail},{$pull:{jobOffers:r._id}}).then(()=>t.status(200).json({message:"Offer successfuly deleted"})).catch(e=>n(e))})})},function(e,t,n){"use strict";var r=s(n(26)),a=s(n(7));function s(e){return e&&e.__esModule?e:{default:e}}t.get=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{header:s,elements:o}=e.body,u={header:s,elements:o};r.default.create(u,(e,r)=>{if(e)return n(e);let s={origin:r._id,title:r.header.title,totalAnswers:0,answers:[]};r.elements.forEach(e=>{let t={question:e.label,options:[]};e.values.forEach(e=>t.options.push({value:e.label,count:0})),s.answers.push(t)}),a.default.create(s,e=>e?n(e):t.json(r))})}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,r=>{if(r)return n(r);a.default.findOneAndDelete({origin:e.params.id}).then(()=>t.json({message:"Survey entry successfully removed"})).catch(e=>n(e))})})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({header:{title:{type:String,required:!0},subtitle:{type:String},startDate:{type:Date,default:Date.now},endDate:{type:Date,required:!0},description:{type:String,required:!0}},elements:[{type:{type:String,required:!0},label:{type:String,required:!0},name:{type:String,required:!0},values:[{label:{type:String,required:!0},value:{type:String,required:!0}}]}]});t.default=a.default.model("Survey",s)},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(7));t.get=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getByOrigin=((e,t,n)=>{console.log(e.params.origin),r.default.findOne({origin:e.params.origin}).populate("origin").then(e=>t.json(e[0])).catch(e=>n(e))}),t.updateSummary=((e,t,n)=>{let a=Object.assign({},e.body);console.log(a),r.default.find({origin:e.params.origin}).then(s=>{let{totalAnswers:o,answers:u}=s[0],l=[];a.questions.forEach(e=>{let t=u.findIndex(t=>t.question===e);l.push(t)});let i=u.slice(0);l.forEach((e,t)=>{i[e].options.forEach(e=>{e.value===a.answers[t]&&(e.count+=1)})});let d={totalAnswers:o+=1,answers:i};r.default.update({origin:e.params.origin},d,{new:!0}).then(e=>t.json(e)).catch(e=>n(e))}).catch(e=>n(e))})},function(e,t,n){"use strict";var r=o(n(29)),a=o(n(2)),s=o(n(3));function o(e){return e&&e.__esModule?e:{default:e}}t.uploadFile=((e,t,n)=>{let{type:o,id:u}=e.params,l={model:u,type:o};e.file&&(l.url=`${e.protocol}://${e.hostname}/${e.file.path}`),r.default.deleteOne({model:u}).then(()=>{r.default.create(l,(e,r)=>{if(e)return n(e);"user"===o?a.default.findByIdAndUpdate(u,{avatar:r.url},{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)}):"company"===o&&s.default.findByIdAndUpdate(u,{logo:r.url},{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)})})}).catch(e=>t.json(e))})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r);const s=new r.Schema({url:String,type:String,model:String});t.default=a.default.model("File",s)},function(e,t,n){"use strict";var r=s(n(1)),a=s(n(2));function s(e){return e&&e.__esModule?e:{default:e}}t.login=((e,t,n)=>{a.default.findOne({email:e.body.email,username:e.body.username}).then(e=>{r.default.sign({user:e._id},"secret_key",{expiresIn:"30m"},(r,a)=>{if(r)return n(r);t.status(200).json({message:`Welcome back, ${e.name}`,token:a})})}).catch(()=>t.status(400).json({message:"username or email not valid"}))})}]);