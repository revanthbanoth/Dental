/**
 * Lotus Dental Clinic – Admin Seeder
 * Run this once to create the admin user in MongoDB.
 * Usage: node seedAdmin.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://brevanth50_db_user:revanth05@cluster0.eod5r4t.mongodb.net/dental-clinic?appName=Cluster0';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB:', MONGO_URI);

        // Check if admin already exists
        const existing = await Admin.findOne({ username: 'admin' });
        if (existing) {
            console.log('⚠️  Admin already exists in MongoDB:');
            console.log(`   Username : ${existing.username}`);
            console.log(`   Name     : ${existing.name}`);
            console.log(`   Email    : ${existing.email}`);
            console.log(`   Role     : ${existing.role}`);
            console.log(`   Created  : ${existing.createdAt}`);
            console.log('\n🔑 Login credentials: admin / admin123');
            process.exit(0);
        }

        // Create admin user
        const admin = await Admin.create({
            username: 'admin',
            password: 'admin123',          // Will be hashed automatically by pre-save hook
            name: 'Lotus Dental Admin',
            email: 'admin@lotusdentalcompally.com',
            role: 'superadmin',
            isActive: true,
        });

        console.log('\n🎉 Admin created successfully in MongoDB!');
        console.log('─────────────────────────────────────────');
        console.log(`   ID       : ${admin._id}`);
        console.log(`   Username : ${admin.username}`);
        console.log(`   Name     : ${admin.name}`);
        console.log(`   Email    : ${admin.email}`);
        console.log(`   Role     : ${admin.role}`);
        console.log('─────────────────────────────────────────');
        console.log('🔑 Login with: admin / admin123');
        console.log('🌐 Admin URL : http://localhost:5173/admin\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeder error:', error.message);
        process.exit(1);
    }
};

seedAdmin();
