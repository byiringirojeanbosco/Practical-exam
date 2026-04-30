export const symptomOptions = [
  {
    id: "fever",
    label: "Fever",
    helper: "Temperature, chills, body aches",
    tags: ["family-medicine", "internal-medicine", "pediatrics"]
  },
  {
    id: "cough",
    label: "Cough",
    helper: "Dry cough, chest congestion",
    tags: ["family-medicine", "pulmonology", "pediatrics"]
  },
  {
    id: "chest-pain",
    label: "Chest pain",
    helper: "Pressure, tightness, short breath",
    tags: ["cardiology", "internal-medicine"]
  },
  {
    id: "skin-rash",
    label: "Skin rash",
    helper: "Irritation, swelling, itching",
    tags: ["dermatology", "family-medicine"]
  },
  {
    id: "headache",
    label: "Headache",
    helper: "Migraine, dizziness, nausea",
    tags: ["neurology", "family-medicine"]
  },
  {
    id: "stomach-pain",
    label: "Stomach pain",
    helper: "Cramps, nausea, digestion",
    tags: ["gastroenterology", "internal-medicine"]
  },
  {
    id: "child-care",
    label: "Child unwell",
    helper: "Child fever, cough, feeding issues",
    tags: ["pediatrics", "family-medicine"]
  },
  {
    id: "pregnancy",
    label: "Pregnancy care",
    helper: "Check-up, pain, bleeding concerns",
    tags: ["obstetrics", "family-medicine"]
  },
  {
    id: "joint-pain",
    label: "Joint pain",
    helper: "Swelling, injury, limited movement",
    tags: ["orthopedics", "family-medicine"]
  },
  {
    id: "stress-sleep",
    label: "Stress or sleep",
    helper: "Anxiety, low mood, insomnia",
    tags: ["behavioral-health", "family-medicine"]
  },
  {
    id: "diabetes",
    label: "Diabetes care",
    helper: "Sugar control, foot or eye review",
    tags: ["endocrinology", "internal-medicine"]
  },
  {
    id: "blood-pressure",
    label: "Blood pressure",
    helper: "High readings, dizziness, follow-up",
    tags: ["cardiology", "internal-medicine", "family-medicine"]
  }
];

export const doctors = [
  {
    id: "dr-anele-mokoena",
    name: "Dr. Anele Mokoena",
    specialty: "Family Medicine",
    specialtyTag: "family-medicine",
    rating: 4.9,
    nextAvailable: "Today",
    location: "Ground Floor, Clinic A",
    languages: ["English", "isiZulu"],
    availability: ["09:00", "10:30", "12:00", "15:30"],
    acceptsWalkIn: true,
    bio: "First-contact care for adults and children, including acute symptoms and chronic follow-ups."
  },
  {
    id: "dr-priya-naidoo",
    name: "Dr. Priya Naidoo",
    specialty: "Cardiology",
    specialtyTag: "cardiology",
    rating: 4.8,
    nextAvailable: "Tomorrow",
    location: "Level 2, Heart Centre",
    languages: ["English"],
    availability: ["08:30", "11:00", "14:00"],
    acceptsWalkIn: false,
    bio: "Heart and blood pressure specialist with rapid assessment pathways for chest discomfort."
  },
  {
    id: "dr-samuel-okra",
    name: "Dr. Samuel Okra",
    specialty: "Pediatrics",
    specialtyTag: "pediatrics",
    rating: 4.9,
    nextAvailable: "Today",
    location: "Level 1, Children's Wing",
    languages: ["English", "Setswana"],
    availability: ["09:30", "11:30", "13:30", "16:00"],
    acceptsWalkIn: true,
    bio: "Child health appointments for fever, cough, feeding concerns, and routine pediatric review."
  },
  {
    id: "dr-laila-khan",
    name: "Dr. Laila Khan",
    specialty: "Dermatology",
    specialtyTag: "dermatology",
    rating: 4.7,
    nextAvailable: "Fri",
    location: "Level 3, Specialist Suites",
    languages: ["English", "Afrikaans"],
    availability: ["10:00", "12:30", "15:00"],
    acceptsWalkIn: false,
    bio: "Skin, rash, allergy, and mole checks with clear treatment plans."
  },
  {
    id: "dr-michael-smith",
    name: "Dr. Michael Smith",
    specialty: "Neurology",
    specialtyTag: "neurology",
    rating: 4.8,
    nextAvailable: "Thu",
    location: "Level 3, Neuro Clinic",
    languages: ["English"],
    availability: ["09:00", "13:00", "15:30"],
    acceptsWalkIn: false,
    bio: "Neurological assessments for migraine, dizziness, nerve pain, and follow-up care."
  },
  {
    id: "dr-thandi-dlamini",
    name: "Dr. Thandi Dlamini",
    specialty: "Obstetrics",
    specialtyTag: "obstetrics",
    rating: 4.9,
    nextAvailable: "Tomorrow",
    location: "Level 2, Women's Health",
    languages: ["English", "isiXhosa"],
    availability: ["08:00", "10:00", "12:30", "14:30"],
    acceptsWalkIn: true,
    bio: "Pregnancy and postnatal care with calm triage for urgent concerns."
  },
  {
    id: "dr-nadia-patel",
    name: "Dr. Nadia Patel",
    specialty: "Internal Medicine",
    specialtyTag: "internal-medicine",
    rating: 4.8,
    nextAvailable: "Today",
    location: "Level 1, Medical Clinic",
    languages: ["English"],
    availability: ["08:30", "09:30", "11:30", "14:30"],
    acceptsWalkIn: false,
    bio: "Complex adult care including blood pressure, diabetes review, fever, and abdominal symptoms."
  },
  {
    id: "dr-johan-venter",
    name: "Dr. Johan Venter",
    specialty: "Orthopedics",
    specialtyTag: "orthopedics",
    rating: 4.6,
    nextAvailable: "Fri",
    location: "Level 2, Ortho Clinic",
    languages: ["English", "Afrikaans"],
    availability: ["10:30", "13:00", "15:00"],
    acceptsWalkIn: false,
    bio: "Joint pain, injury review, mobility checks, and practical recovery plans."
  },
  {
    id: "dr-amara-botha",
    name: "Dr. Amara Botha",
    specialty: "Behavioral Health",
    specialtyTag: "behavioral-health",
    rating: 4.9,
    nextAvailable: "Tomorrow",
    location: "Level 4, Wellness Clinic",
    languages: ["English"],
    availability: ["09:00", "12:00", "16:00"],
    acceptsWalkIn: false,
    bio: "Support for stress, sleep, anxiety, and medication follow-up in a private setting."
  },
  {
    id: "dr-kevin-gounder",
    name: "Dr. Kevin Gounder",
    specialty: "Endocrinology",
    specialtyTag: "endocrinology",
    rating: 4.7,
    nextAvailable: "Mon",
    location: "Level 3, Metabolic Clinic",
    languages: ["English"],
    availability: ["08:30", "11:00", "13:30"],
    acceptsWalkIn: false,
    bio: "Diabetes, thyroid, and long-term metabolic condition appointments."
  },
  {
    id: "dr-fatima-essop",
    name: "Dr. Fatima Essop",
    specialty: "Gastroenterology",
    specialtyTag: "gastroenterology",
    rating: 4.8,
    nextAvailable: "Thu",
    location: "Level 3, Digestive Health",
    languages: ["English"],
    availability: ["09:30", "12:30", "15:30"],
    acceptsWalkIn: false,
    bio: "Digestive health review for stomach pain, reflux, nausea, and bowel changes."
  },
  {
    id: "dr-elena-rossi",
    name: "Dr. Elena Rossi",
    specialty: "Pulmonology",
    specialtyTag: "pulmonology",
    rating: 4.7,
    nextAvailable: "Tomorrow",
    location: "Level 2, Respiratory Clinic",
    languages: ["English"],
    availability: ["08:00", "10:30", "14:00"],
    acceptsWalkIn: false,
    bio: "Respiratory symptoms, asthma, persistent cough, and breathing assessments."
  }
];

export const hospitalDirections = [
  "Enter through Main Reception.",
  "Use the left queue for appointment check-in.",
  "Go to the clinic level shown on your booking.",
  "Keep your phone nearby for queue updates."
];

export const medicationPlan = [
  {
    id: "med-paracetamol",
    name: "Paracetamol 500mg",
    instruction: "Take 1 tablet every 8 hours if fever or pain continues.",
    duration: "3 days"
  },
  {
    id: "med-saline",
    name: "Saline nasal spray",
    instruction: "Use 2 sprays per nostril morning and evening.",
    duration: "5 days"
  }
];
