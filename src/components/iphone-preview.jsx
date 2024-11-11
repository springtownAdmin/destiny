import React from 'react'

export const IPhonePreview = ({ children }) => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          <div className="w-full h-full scrollbar-hide overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

}

// Example components to preview
const Button = ({ text }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {text}
  </button>
)

const Card = ({ title, content }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">
        {content}
      </p>
    </div>
  </div>
)

export default function Preview() {

  return (
    <IPhonePreview>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center">iPhone Preview</h1>
        <Button text="Click me!" />
        <Card 
          title="Example Card" 
          content="This is an example card component inside the iPhone preview."
        />
        <p className="text-sm text-gray-600">
          Scroll to see more content if needed. This preview is responsive and will adapt to different screen sizes.
        </p>
      </div>
    </IPhonePreview>
  );

}