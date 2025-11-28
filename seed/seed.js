import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
dotenv.config();
async function seed(){
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
    // wipe existing
    await Product.deleteMany({});
    await Category.deleteMany({});
    const cats = [];
        const c0 = await Category.create({'name': "RESMED"});
        cats.push(c0);
        await Product.create({
          name: "Airstart 10 apap",
          desc: "High precision CPAP machine",
          price: 50900,
          img: "img/airstart 10apap.webp",
          features: ["Auto-adjusting pressure", "Quiet operation", "Easy-clean filters"],
          categoryId: c0._id
        });
        await Product.create({
          name: "Airsense 10 auto set",
          desc: "Advanced auto CPAP device",
          price: 92000,
          img: "img/airsense 11 autoset.webp",
          features: ["SmartStart technology", "Data tracking", "Built-in humidifier"],
          categoryId: c0._id
        });
        await Product.create({
          name: "Airsense 11",
          desc: "Digital CPAP system",
          price: 85000,
          img: "img/airsense 11 autoset.webp",
          features: ["Compact design", "Touchscreen control", "Bluetooth connectivity"],
          categoryId: c0._id
        });
        await Product.create({
          name: "Lumis 100 st",
          desc: "Reliable BiPAP system",
          price: 112000,
          img: "img/lumis 100st.webp",
          features: ["Automatic pressure adjustment", "Low noise", "Portable design"],
          categoryId: c0._id
        });
        await Product.create({
          name: "Aircurve V AUTO",
          desc: "Smart BiPAP ventilator",
          price: 98600,
          img: "img/Aircurve 10vauto.webp",
          features: ["Dual pressure support", "Data monitoring", "Comfortable mask interface"],
          categoryId: c0._id
        });
        await Product.create({
          name: "Lumis 150 vpap st",
          desc: "Advanced BiPAP machine",
          price: 152000,
          img: "img/lumis 150 vpapst.webp",
          features: ["Backup rate control", "Customizable settings", "Easy-to-clean filters"],
          categoryId: c0._id
        });
        await Product.create({
          name: "F20  mask",
          desc: "",
          price: 3500,
          img: "img/resmed f20 mask.webp",
          features: ["Compact design", "Touchscreen control", "Bluetooth connectivity"],
          categoryId: c0._id
        });
        await Product.create({
          name: "N20  mask",
          desc: "",
          price: 4200,
          img: "img/resmed n20 mask.webp",
          features: ["Compact design", "Touchscreen control", "Bluetooth connectivity"],
          categoryId: c0._id
        });
        const c1 = await Category.create({'name': "BMC"});
        cats.push(c1);
        await Product.create({
          name: "G2S C20",
          desc: "treating abstructive apnea (OSA)",
          price: 20000.0,
          img: "img/G2S c20.webp",
          features: ["Auto-adjusting pressure", "Quiet operation", "Easy-clean filters"],
          categoryId: c1._id
        });
        await Product.create({
          name: "G3 C20",
          desc: "New generation of basic fixed pressure device",
          price: 30000.0,
          img: "img/G3 c20.webp",
          features: ["SmartStart technology", "Data tracking", "Built-in humidifier"],
          categoryId: c1._id
        });
        await Product.create({
          name: "BMC F2 full fase mask",
          desc: "New generation of basic fixed pressure device",
          price: 1200,
          img: "img/bmc face mask.webp",
          features: ["SmartStart technology", "Data tracking", "Built-in humidifier"],
          categoryId: c1._id
        });
    console.log('Seeding completed');
    process.exit(0);
  }catch(e){
    console.error(e);
    process.exit(1);
  }
}
seed();
