import React from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "./Accordion";
import { cn } from '~/lib/utils';

// Define the Feedback type
interface Tip {
  type: 'good' | 'improve';
  tip: string;
  explanation: string;
}

interface Category {
  title: string;
  score: number;
  tips: Tip[];
}

interface Feedback {
  toneAndStyle: Category;
  content: Category;
  structure: Category;
  skills: Category;
}

// ScoreBadge component
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge color based on score
  const getBadgeStyles = () => {
    if (score > 69) {
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      };
    } else if (score > 39) {
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: null
      };
    } else {
      return {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: null
      };
    }
  };

  const { bg, text, icon } = getBadgeStyles();

  return (
    <div className={cn('flex items-center px-2 py-1 rounded-md', bg)}>
      {icon}
      <span className={cn('text-sm font-medium', text)}>{score}/100</span>
    </div>
  );
};

// CategoryHeader component
interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3 className="text-lg font-medium">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// CategoryContent component
interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start">
            {tip.type === 'good' ? (
              <svg className="w-5 h-5 mt-0.5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mt-0.5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span className="text-sm">{tip.tip}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={cn(
              'p-3 rounded-md text-sm', 
              tip.type === 'good' 
                ? 'bg-green-50 border border-green-100 text-green-800' 
                : 'bg-yellow-50 border border-yellow-100 text-yellow-800'
            )}
          >
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Details component
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <Accordion className="w-full">
      <AccordionItem id="tone-and-style">
        <AccordionHeader itemId="tone-and-style">
          <CategoryHeader 
            title="Tone and Style" 
            categoryScore={feedback.toneAndStyle.score} 
          />
        </AccordionHeader>
        <AccordionContent itemId="tone-and-style">
          <CategoryContent tips={feedback.toneAndStyle.tips} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem id="content">
        <AccordionHeader itemId="content">
          <CategoryHeader 
            title="Content" 
            categoryScore={feedback.content.score} 
          />
        </AccordionHeader>
        <AccordionContent itemId="content">
          <CategoryContent tips={feedback.content.tips} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem id="structure">
        <AccordionHeader itemId="structure">
          <CategoryHeader 
            title="Structure" 
            categoryScore={feedback.structure.score} 
          />
        </AccordionHeader>
        <AccordionContent itemId="structure">
          <CategoryContent tips={feedback.structure.tips} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem id="skills">
        <AccordionHeader itemId="skills">
          <CategoryHeader 
            title="Skills" 
            categoryScore={feedback.skills.score} 
          />
        </AccordionHeader>
        <AccordionContent itemId="skills">
          <CategoryContent tips={feedback.skills.tips} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Details;
