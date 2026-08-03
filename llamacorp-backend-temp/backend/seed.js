const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Service = require('./models/Service');
const Pricing = require('./models/Pricing');
const Blog = require('./models/Blog');
const CaseStudy = require('./models/CaseStudy');

const seedDB = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB.');

    // Clear existing data (optional, useful for clean seeds)
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Service.deleteMany({});
    await Pricing.deleteMany({});
    await Blog.deleteMany({});
    await CaseStudy.deleteMany({});

    // 1. Create Admin User
    console.log('Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@llamacorp.com',
      password: 'admin1234', // Will be hashed by pre-save middleware
      role: 'admin',
      isVerified: true
    });

    // 2. Create Services
    console.log('Creating services...');
    const services = await Service.insertMany([
      {
        title: 'AI Web Design & Development',
        slug: 'web-design',
        description: 'Create modern websites focusing on speed, responsiveness, and conversion optimization.',
        features: ['Custom website design', 'AI-assisted development', 'Responsive UI/UX', 'Performance optimization']
      },
      {
        title: 'Social Media Management',
        slug: 'social-media',
        description: 'Help brands grow their online presence through strategic content and AI-driven insights.',
        features: ['Content creation & scheduling', 'Social media strategy', 'Audience engagement', 'Analytics & performance tracking']
      },
      {
        title: 'SEO (Search Engine Optimization)',
        slug: 'seo',
        description: 'Improve website visibility and ranking on search engines with smart SEO techniques.',
        features: ['On-page SEO', 'Off-page SEO', 'Keyword research', 'Technical SEO']
      },
      {
        title: 'Brand & Creative',
        slug: 'branding',
        description: 'Build a strong and memorable brand identity with creative design solutions.',
        features: ['Logo design', 'Brand identity', 'Creative assets', 'Marketing visuals']
      }
    ]);

    // Helper map for quick ID lookup
    const serviceMap = services.reduce((acc, service) => {
      acc[service.slug] = service._id;
      return acc;
    }, {});

    // 3. Create Pricing Plans
    console.log('Creating pricing plans...');
    const pricingPlans = [
      // Web Design Pricing
      {
        serviceId: serviceMap['web-design'],
        name: 'Basic Site',
        price: 499,
        billingType: 'one-time',
        features: ['Up to 5 Pages', 'Mobile Responsive', 'Basic SEO Setup', 'Contact Form Integration'],
        isPopular: false
      },
      {
        serviceId: serviceMap['web-design'],
        name: 'Pro Website',
        price: 1299,
        billingType: 'one-time',
        features: ['Up to 15 Pages', 'Advanced Animations', 'CMS Integration', 'E-commerce (up to 50 products)'],
        isPopular: true
      },
      // Social Media Pricing
      {
        serviceId: serviceMap['social-media'],
        name: 'Starter Content',
        price: 499,
        billingType: 'monthly',
        features: ['12 Posts per Month', '2 Platforms', 'Basic Analytics Report', 'Content Calendar'],
        isPopular: false
      },
      {
        serviceId: serviceMap['social-media'],
        name: 'Growth Pack',
        price: 899,
        billingType: 'monthly',
        features: ['24 Posts per Month', 'Up to 4 Platforms', 'Community Management', 'Monthly Strategy Call'],
        isPopular: true
      },
      // SEO Pricing
      {
        serviceId: serviceMap['seo'],
        name: 'Foundation',
        price: 599,
        billingType: 'monthly',
        features: ['Technical SEO Audit', 'Keyword Research (Up to 50)', 'On-Page Optimization', 'Google Analytics Setup'],
        isPopular: false
      },
      {
        serviceId: serviceMap['seo'],
        name: 'Growth',
        price: 1499,
        billingType: 'monthly',
        features: ['Keyword Research (Up to 200)', 'On-Page Optimization (20 pages)', 'High-Quality Backlinks (5/mo)', 'Local SEO Optimization'],
        isPopular: true
      },
      // Branding Pricing
      {
        serviceId: serviceMap['branding'],
        name: 'Logo & Colors',
        price: 899,
        billingType: 'one-time',
        features: ['3 Logo Concepts', 'Color Palette', 'Typography Selection', 'Basic Brand Guidelines (PDF)'],
        isPopular: false
      },
      {
        serviceId: serviceMap['branding'],
        name: 'Full Identity',
        price: 2499,
        billingType: 'one-time',
        features: ['5 Logo Concepts', 'Comprehensive Brand Book', 'Social Media Templates', 'Business Card & Letterhead'],
        isPopular: true
      }
    ];
    await Pricing.insertMany(pricingPlans);

    // 4. Create a Sample Blog Post
    console.log('Creating a sample blog post...');
    await Blog.create({
      title: 'How AI is Changing Web Design',
      slug: 'how-ai-is-changing-web-design',
      content: 'Artificial Intelligence is revolutionizing how we build websites. From intelligent layout generation to dynamic content personalization, AI tools are making developers faster and end-user experiences vastly superior...',
      excerpt: 'Discover how artificial intelligence is transforming modern web development and design processes.',
      authorId: adminUser._id,
      tags: ['AI', 'Web Design', 'Technology'],
      isPublished: true
    });

    // 5. Create a Sample Case Study
    console.log('Creating a sample case study...');
    await CaseStudy.create({
      title: 'Aura - AI E-Commerce Platform',
      slug: 'aura-ai-ecommerce-platform',
      description: 'An adaptive storefront that personalizes user experiences in real-time.',
      content: 'We partnered with Aura to completely rebuild their legacy e-commerce platform using modern React and Node.js microservices, powered by machine learning algorithms for personalized product recommendations...',
      technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow.js'],
      results: {
        performanceBoost: '2.5x faster page loads',
        conversionRate: '35% increase in checkout conversions'
      },
      isPublished: true
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
