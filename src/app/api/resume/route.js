import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Resume from '@/models/Resume';

// GET - Load resume data
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const resume = await Resume.findOne({ userId: session.user.id });
    
    if (!resume) {
      return NextResponse.json({ data: null }, { status: 200 });
    }

    return NextResponse.json({ data: resume }, { status: 200 });
  } catch (error) {
    console.error('Error loading resume:', error);
    return NextResponse.json({ error: 'Failed to load resume' }, { status: 500 });
  }
}

// POST - Save/Update resume data
export async function POST(request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resumeData, activeTemplate } = body;

    await dbConnect();

    const updateData = {
      userId: session.user.id,
      personalInfo: resumeData.personalInfo,
      experience: resumeData.experience,
      education: resumeData.education,
      skillCategories: resumeData.skillCategories,
      projects: resumeData.projects,
      sectionOrder: resumeData.sectionOrder,
      activeTemplate: activeTemplate,
    };

    const resume = await Resume.findOneAndUpdate(
      { userId: session.user.id },
      updateData,
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: resume }, { status: 200 });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 });
  }
}
