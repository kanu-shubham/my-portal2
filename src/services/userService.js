

export const fetchUserData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock user data
    return {
      name: 'John Doe',
      profile: {
        completionPercentage: 75,
        completionItems: [
          { text: 'Add profile picture', completed: true },
          { text: 'Complete education details', completed: true },
          { text: 'Add work experience', completed: false },
          { text: 'Upload resume', completed: true },
        ],
      },
      recommendedJobs: [
        { id: 1, title: 'Senior Frontend Developer', company: 'Tech Corp', location: 'New York, NY' },
        { id: 2, title: 'Full Stack Engineer', company: 'Startup Inc.', location: 'Remote' },
        { id: 3, title: 'React Native Developer', company: 'Mobile Apps Co.', location: 'San Francisco, CA' },
      ],
      pendingActions: [
        { text: 'Complete your profile to improve job matches' },
        { text: 'Review 2 new job invitations' },
        { text: 'Schedule an interview with Tech Corp' },
      ],
      recentActivities: [
        { type: 'application', text: 'Applied for Senior Frontend Developer', date: '2023-07-20' },
        { type: 'profile', text: 'Updated your skills', date: '2023-07-18' },
        { type: 'message', text: 'Received a message from Startup Inc.', date: '2023-07-15' },
      ],
    };
  };