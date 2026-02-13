export interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Thompson",
    location: "Springfield, MA",
    service: "Roofing",
    rating: 5,
    text: "Outstanding work on our roof replacement! The team was professional, clean, and finished ahead of schedule. Our new roof looks amazing and we've already noticed lower energy bills.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Hartford, CT",
    service: "Windows",
    rating: 5,
    text: "We replaced all 12 windows in our home and couldn't be happier. The difference in comfort and noise reduction is incredible. Highly recommend their services!",
  },
  {
    id: 3,
    name: "Robert Garcia",
    location: "Westfield, MA",
    service: "Siding",
    rating: 5,
    text: "The siding transformation completely changed our home's appearance. Neighbors keep complimenting how great it looks. Quality work at a fair price.",
  },
  {
    id: 4,
    name: "Emily Davis",
    location: "Enfield, CT",
    service: "Gutters",
    rating: 5,
    text: "Finally, no more clogged gutters! The gutter guard system they installed works perfectly. Professional installation and great follow-up service.",
  },
  {
    id: 5,
    name: "James Wilson",
    location: "Agawam, MA",
    service: "Roofing",
    rating: 5,
    text: "After the storm damaged our roof, they responded quickly and handled everything including the insurance claim. True professionals from start to finish.",
  },
  {
    id: 6,
    name: "Lisa Martinez",
    location: "Windsor, CT",
    service: "Windows & Siding",
    rating: 5,
    text: "We did a complete exterior makeover - windows and siding. The project was completed on time, within budget, and the results exceeded our expectations.",
  },
];
