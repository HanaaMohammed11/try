import { Card } from 'flowbite-react';
import React from 'react';

export default function Cards() {
  return (
    <div className="flex flex-wrap gap-20 justify-center flex-1  items-center mb-16 mt-5">
      <div className="flex flex-wrap gap-20 items-center p-4">


        {/* Card 1  */}
        <Card 
          href="/users" 
          className="p-9 w-80 text-center h-52 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  style={{ 
    border: "9px solid rgba(128, 128, 128, 0.9)" 
  }}>
          <h1 
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" 
            style={{ fontFamily: "cursive" }}
          >
            الموظفين
          </h1>
        </Card>

        {/* Card 2 */}
        <Card 
          href="/sujects" 
          className="p-9 w-80 text-center h-52 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          style={{ 
            border: "9px solid rgba(128, 128, 128, 0.9)" // إطار رمادي عريض مع شفافية 50%
          }}>
          <h1 
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" 
            style={{ fontFamily: "cursive" }}
          >
            الصلاحيات
          </h1>
        </Card>
    
                {/* Card 3 */}
                <Card 
  href="/Matrix" 
  className="p-9 w-80 text-center h-52 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  style={{ 
    border: "9px solid rgba(128, 128, 128, 0.9)" 
  }}
>
          <h1 
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" 
            style={{ fontFamily: "cursive" }}
          >
            المصفوفات
          </h1>
        </Card>
            
        {/* Card 4 */}
        <Card 
          href="/dashboard" 
          className="p-9 w-80 text-center h-52 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          style={{ 
            border: "9px solid rgba(128, 128, 128, 0.9)" 
          }}>
          <h1 
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" 
            style={{ fontFamily: "cursive" }}
          >
            لوحة التحكم
          </h1>
        </Card>
      </div>
    </div>
  );
}
