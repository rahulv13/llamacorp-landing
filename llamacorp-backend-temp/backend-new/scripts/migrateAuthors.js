const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend-new/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Author = require('../models/Author');
const Blog = require('../models/Blog');

async function migrate() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        console.log('Checking for default author...');
        let defaultAuthor = await Author.findOne({ slug: 'rahul-vishwakarma' });

        if (!defaultAuthor) {
            console.log('Default author not found. Creating "Rahul Vishwakarma"...');
            defaultAuthor = await Author.create({
                fullName: 'Rahul Vishwakarma',
                slug: 'rahul-vishwakarma',
                jobTitle: 'Founder & CEO',
                bio: 'Founder of Llamacorp. Passionate about technology and building great products.',
                featured: true,
                isActive: true
            });
            console.log('Created default author:', defaultAuthor._id);
        } else {
            console.log('Default author already exists:', defaultAuthor._id);
        }

        console.log('Finding blogs that need migration...');
        
        // Find blogs where author is missing or is not a valid ObjectId reference to an Author
        // Some older blogs might have an admin user ID, we need to check if the author exists in Author collection.
        const blogs = await Blog.find({});
        const authors = await Author.find({});
        const validAuthorIds = authors.map(a => a._id.toString());

        let migratedCount = 0;

        for (let blog of blogs) {
            if (!blog.author || !validAuthorIds.includes(blog.author.toString())) {
                console.log(`Migrating blog: "${blog.title}" (${blog._id})`);
                blog.author = defaultAuthor._id;
                await blog.save();
                migratedCount++;
            }
        }

        console.log(`Migration complete. ${migratedCount} blogs migrated.`);
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
