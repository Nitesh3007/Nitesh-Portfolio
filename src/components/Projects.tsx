import React from "react";

const projectsData = [
  {
    id: "proj_aeiou_001",
    name: "A.E.I.O.U. (An Emotion Invigilator Only for You)",
    techStack: ["ReactJS", "MongoDB", "Express.js", "NodeJS"],
    liveLink: "https://a-e-i-o-u.netlify.app/",
    description: [
      "Built a gamified web application to make stress, anxiety, and depression management fun and actionable.",
      "Enables users to take control of emotional well-being by selecting daily tasks through a short interactive quiz.",
      "Designed the application using React.js and Bootstrap."
    ]
  },
  {
    id: "proj_travelmate_002",
    name: "TravelMate",
    techStack: ["ReactJS", "Google Gemini AI", "Firebase", "Google Places API"],
    liveLink: "https://travel-mate1.netlify.app/",
    description: [
      "AI-powered travel planner that generates personalized itineraries based on user preferences and budget.",
      "Used Google Gemini AI for generating trip plans and Firebase for authentication and data storage.",
      "Integrated Google Places API to provide location details and visual content for an enhanced travel planning experience."
    ]
  }
];

const Projects = () => {
  return (
    <section id="projects-section" className="min-h-screen py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Projects
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            A showcase of my work and passion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-black border border-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-3xl font-semibold text-white mb-4">
                {project.name}
              </h3>
              <p className="text-lg text-gray-400 mb-4">
                Tech Stack: {project.techStack.join(", ")}
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                {project.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;