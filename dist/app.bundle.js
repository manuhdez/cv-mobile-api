module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("mongoose")},function(e,t,n){"use strict";const r=n(0),a=r.Schema,s=new a({name:{type:String,required:!0,unique:!0},docType:{type:String,required:!0},docNumber:{type:String,required:!0,unique:!0},email:{type:String,required:!0,unique:!0,trim:!0},website:{type:String,trim:!0,unique:!0},address:{country:{type:String,required:!0},street:{type:String},city:{type:String},zipcode:{type:Number}},socialUrls:[{platform:String,url:String}],logo:{type:String,trim:!0},bio:{type:String},employees:{type:Number},phone:{type:String},registeredDate:{type:Date,default:Date.now},jobOffers:[{type:a.Types.ObjectId,ref:"JobOffer"}]}),o=r.model("Company",s);e.exports=o},function(e,t){e.exports=require("express")},function(e,t,n){"use strict";const r=n(0),a=r.Schema,s=new a({name:{type:String,required:!0},username:{type:String,required:!0},email:{type:String,unique:!0,required:!0},phone:{type:String,unique:!0,sparse:!0},gender:String,address:{country:{type:String,required:!0},city:{type:String},street:{type:String},zipcode:{type:Number}},company:String,jobTitle:String,languages:[{type:[a.Types.ObjectId],ref:"Language"}],skills:[{type:[a.Types.ObjectId],ref:"Skill"}],experience:String,birthDate:Date,website:{type:String,trim:!0,unique:!0,sparse:!0},avatar:{type:String,trim:!0},registeredDate:{type:Date,default:Date.now}}),o=r.model("User",s);e.exports=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=new r.default.Schema({companyEmail:{type:String,required:!0,trim:!0},company:String,title:{type:String,required:!0},contractType:{type:String,required:!0},location:{type:String,required:!0},description:String,responsabilities:[String],whatWeOffer:[{title:String,description:String}],whatWeLookFor:[{title:String,description:String}],publishDate:{type:Date,default:Date.now}}),s=r.default.model("JobOffer",a);t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=r.default.Schema,s=new a({origin:{type:a.Types.ObjectId,ref:"Survey",required:!0},title:{type:String,required:!0},totalAnswers:Number,answers:[{question:String,options:[{value:{type:String,required:!0},count:Number}]}]}),o=r.default.model("Summary",s);t.default=o},function(e,t,n){"use strict";var r=f(n(2)),a=f(n(7)),s=f(n(8)),o=f(n(9)),i=f(n(10)),l=f(n(0)),u=f(n(11)),d=f(n(12)),c=f(n(13));function f(e){return e&&e.__esModule?e:{default:e}}const p=(0,r.default)();n(27).config(),p.use((0,i.default)()),p.use((0,d.default)()),p.use((0,u.default)("UA-127831712-2")),p.use((0,s.default)({filter:function(e,t){if(e.headers["x-no-compression"])return!1}}));p.use((0,a.default)("combined")),p.use("/uploads",r.default.static("uploads")),p.use(o.default.json()),p.use(o.default.urlencoded({extended:!1}));let m=`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;l.default.connect(m,{useNewUrlParser:!0});const g=l.default.connection;g.on("error",e=>{console.error("Mongodb connection error:",e)}),g.on("open",()=>{console.log("Mongodb connected successfully")}),p.get("/",(e,t)=>{t.redirect("/docs")}),p.get("/docs",(e,t)=>{t.sendfile("views/docs.html")}),p.use("/api",c.default),p.use((e,t,n)=>{const r=new Error("Page not found");return r.status=404,n(r)}),p.use((e,t,n,r)=>{n.status(e.status||500),n.json({error:e.message})});const y=process.env.PORT||3e3;p.listen(y,e=>{e?process.exit(e):console.log(`App listening on 'http://localhost:${y}'...\n           ---\n           Running on production\n           ---\n      `)})},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("express-ga-middleware")},function(e,t){e.exports=require("cors")},function(e,t,n){"use strict";var r=p(n(2)),a=p(n(14)),s=p(n(15)),o=p(n(16)),i=p(n(18)),l=p(n(20)),u=p(n(21)),d=p(n(22)),c=p(n(24)),f=p(n(25));function p(e){return e&&e.__esModule?e:{default:e}}const m=r.default.Router(),g=a.default.diskStorage({destination:function(e,t,n){"user"===e.params.type?n(null,"uploads/avatars"):"company"===e.params.type&&n(null,"uploads/logos")},filename:function(e,t,n){let r=`.${t.mimetype.split("/")[1]}`;n(null,e.params.id+r)}}),y=(0,a.default)({storage:g,limits:{fileSize:3145728},fileFilter:function(e,t,n){"image/jpeg"===t.mimetype||"image/png"===t.mimetype?n(null,!0):n(new Error("Not a valid file format"),!1)}});m.get("/",(e,t,n)=>t.json({welcome:"There is a list with useful links",links:{users:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/users`,skills:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/skills`,languages:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/langs`,companies:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/companies`,job_offers:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/offers`,surveys:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/surveys`,summaries:`${e.protocol}://${"localhost"===e.hostname?"localhost:3000":e.hostname}/api/summaries`}})),m.get("/users",s.default.getAll),m.post("/users",s.default.add),m.get("/users/pages/:pageId",s.default.getPage),m.get("/users/:id",s.default.getById),m.put("/users/:id",s.default.update),m.delete("/users/:id",s.default.delete),m.get("/langs",o.default.getAll),m.post("/langs",o.default.add),m.get("/langs/:id",o.default.getById),m.delete("/langs/:id",o.default.delete),m.get("/skills",i.default.getAll),m.post("/skills",i.default.add),m.get("/skills/:id",i.default.getById),m.delete("/skills/:id",i.default.delete),m.get("/companies",l.default.getAll),m.post("/companies",l.default.add),m.get("/companies/:id",l.default.getById),m.put("/companies/:id",l.default.update),m.delete("/companies/:id",l.default.delete),m.get("/offers",u.default.get),m.post("/offers",u.default.add),m.get("/offers/:id",u.default.getById),m.delete("/offers/:id",u.default.delete),m.get("/surveys",d.default.get),m.post("/surveys",d.default.add),m.delete("/surveys/:id",d.default.delete),m.get("/summaries",c.default.get),m.get("/summaries/:origin",c.default.getByOrigin),m.put("/summaries/:origin",c.default.updateSummary),m.post("/files/upload/:type/:id",y.single("img"),f.default.uploadFile),e.exports=m},function(e,t){e.exports=require("multer")},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(3));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.status(200).json(e)).catch(e=>n(e))}),t.getPage=((e,t,n)=>{r.default.find().skip(10*(e.params.pageId-1)).limit(10).then(e=>t.status(200).json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{name:a,username:s,email:o,phone:i,gender:l,address:u,company:d,jobTitle:c,website:f,birthDate:p,experience:m,languages:g,skills:y}=e.body,h=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`;if(a&&o&&s&&u.country){const e={name:a,username:s,email:o,phone:i,gender:l,address:u,company:d,jobTitle:c,website:f,birthDate:p,experience:m,languages:g,skills:y,avatar:h};r.default.create(e,function(e,r){return e?n(e):t.status(200).json(r)})}else t.status(500).json({error:"Name, username, email and country properties are required."})}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).populate("skills").populate("languages").exec((e,r)=>{if(e)return n(e);t.status(200).json(r)})}),t.update=((e,t,n)=>{let a=Object.assign({},e.body);r.default.findByIdAndUpdate(e.params.id,a,{new:!0}).exec((e,r)=>{if(e)return n(e);t.status(200).json(r)})}),t.delete=((e,t,n)=>{r.default.findByIdAndRemove(e.params.id,e=>{if(e)return n(e);t.status(200).json({message:"User successfuly deleted"})})})},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(17));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{label:a}=e.body;a&&r.default.create({label:a},(e,r)=>e?n(e):t.json(r))}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"Language successfully deleted."}))})},function(e,t,n){"use strict";const r=n(0),a=new(0,r.Schema)({label:{type:String,required:!0,unique:!0}}),s=r.model("Language",a);e.exports=s},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(19));t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{type:a,label:s}=e.body;if(a&&s){let e={type:a,label:s};r.default.create(e,(e,r)=>e?n(e):t.json(r))}}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,e=>e?n(e):t.json({message:"The skill was removed successfully"}))})},function(e,t,n){"use strict";const r=n(0),a=new(0,r.Schema)({type:{type:String,required:!0},label:{type:String,required:!0}}),s=r.model("Skill",a);e.exports=s},function(e,t,n){"use strict";var r=s(n(1)),a=s(n(4));function s(e){return e&&e.__esModule?e:{default:e}}t.getAll=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).populate("jobOffers").then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{name:a,docType:s,docNumber:o,email:i,website:l,address:u,socialUrls:d,bio:c,employees:f,phone:p,jobOffers:m}=e.body,g=`${e.protocol}://${e.hostname}/uploads/default_avatar.png`;if(a&&i&&s&&o&&u.country){const e={name:a,docType:s,docNumber:o,email:i,website:l,address:u,socialUrls:d,bio:c,employees:f,phone:p,jobOffers:m,logo:g};r.default.create(e,(e,r)=>e?n(e):t.json(r))}else t.json({error:"Not all required data was sent"})}),t.update=((e,t,n)=>{let s=Object.assign({},e.body);r.default.findByIdAndUpdate(e.params.id,s).exec((e,r)=>{if(e)return n(e);s.email&&a.default.update({companyEmail:r.email},{companyEmail:s.email}).then(()=>t.json(r)).catch(e=>n(e)),t.json(r)})}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,(e,r)=>{if(e)return n(e);a.default.deleteMany({companyEmail:r.email}).then(()=>t.redirect("/api/companies")).catch(e=>n(e))})})},function(e,t,n){"use strict";var r=s(n(4)),a=s(n(1));function s(e){return e&&e.__esModule?e:{default:e}}t.get=((e,t)=>{r.default.find().then(e=>t.json(e)).catch(e=>next(e))}),t.getById=((e,t,n)=>{r.default.findById(e.params.id).then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{title:s,contractType:o,location:i,description:l,companyEmail:u,company:d,responsabilities:c,whatWeOffer:f,whatWeLookFor:p}=e.body;const m={companyEmail:u,company:d,title:s,contractType:o,location:i,description:l,responsabilities:c,whatWeOffer:f,whatWeLookFor:p};a.default.find({email:u}).then(e=>{if(console.log("doc: ",e.length),0===e.length)return t.json({message:"Please use an existing company email"});r.default.create(m,(e,r)=>{if(e)return n(e);a.default.findOneAndUpdate({email:u},{$push:{jobOffers:r._id}}).then(()=>t.json(r)).catch(e=>n(e))})}).catch(e=>n(e))}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,(e,r)=>{if(e)return n(e);a.default.findOneAndUpdate({email:r.companyEmail},{$pull:{jobOffers:r._id}}).then(e=>t.redirect(`/api/companies/${e._id}`)).catch(e=>n(e))})})},function(e,t,n){"use strict";var r=s(n(23)),a=s(n(5));function s(e){return e&&e.__esModule?e:{default:e}}t.get=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.add=((e,t,n)=>{let{header:s,elements:o}=e.body,i={header:s,elements:o};r.default.create(i,(e,r)=>{if(e)return n(e);let s={origin:r._id,title:r.header.title,totalAnswers:0,answers:[]};r.elements.forEach(e=>{let t={question:e.label,options:[]};e.values.forEach(e=>t.options.push({value:e.label,count:0})),s.answers.push(t)}),a.default.create(s,e=>e?n(e):t.json(r))})}),t.delete=((e,t,n)=>{r.default.findByIdAndDelete(e.params.id,r=>{if(r)return n(r);a.default.findOneAndDelete({origin:e.params.id}).then(()=>t.json({message:"Survey entry successfully removed"})).catch(e=>n(e))})})},function(e,t,n){"use strict";const r=n(0),a=new(0,r.Schema)({header:{title:{type:String,required:!0},subtitle:{type:String},startDate:{type:Date,default:Date.now},endDate:{type:Date,required:!0},description:{type:String,required:!0}},elements:[{type:{type:String,required:!0},label:{type:String,required:!0},name:{type:String,required:!0},values:[{label:{type:String,required:!0},value:{type:String,required:!0}}]}]}),s=r.model("Survey",a);e.exports=s},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(5));t.get=((e,t,n)=>{r.default.find().then(e=>t.json(e)).catch(e=>n(e))}),t.getByOrigin=((e,t,n)=>{console.log(e.params.origin),r.default.findOne({origin:e.params.origin}).populate("origin").then(e=>t.json(e[0])).catch(e=>n(e))}),t.updateSummary=((e,t,n)=>{let a=Object.assign({},e.body);console.log(a),r.default.find({origin:e.params.origin}).then(s=>{let{totalAnswers:o,answers:i}=s[0],l=[];a.questions.forEach(e=>{let t=i.findIndex(t=>t.question===e);l.push(t)});let u=i.slice(0);l.forEach((e,t)=>{u[e].options.forEach(e=>{e.value===a.answers[t]&&(e.count+=1)})});let d={totalAnswers:o+=1,answers:u};r.default.update({origin:e.params.origin},d,{new:!0}).then(e=>t.json(e)).catch(e=>n(e))}).catch(e=>n(e))})},function(e,t,n){"use strict";var r=o(n(26)),a=o(n(3)),s=o(n(1));function o(e){return e&&e.__esModule?e:{default:e}}t.uploadFile=((e,t,n)=>{let{type:o,id:i}=e.params,l={model:i,type:o};e.file&&(l.url=`${e.protocol}://${e.hostname}/${e.file.path}`),r.default.deleteOne({model:i}).then(()=>{r.default.create(l,(e,r)=>{if(e)return n(e);"user"===o?a.default.findByIdAndUpdate(i,{avatar:r.url},{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)}):"company"===o&&s.default.findByIdAndUpdate(i,{logo:r.url},{new:!0}).exec((e,r)=>{if(e)return n(e);t.json(r)})})}).catch(e=>t.json(e))})},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));const a=new(0,r.default.Schema)({url:String,type:String,model:String}),s=r.default.model("File",a);e.exports=s},function(e,t){e.exports=require("dotenv")}]);