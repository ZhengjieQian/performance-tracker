import React, { useState, useRef, useEffect } from 'react';
import { employeeAPI, performanceAPI, departmentAPI } from '../services/api';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your performance tracker assistant. I can help you find information about employees, their performance records, and analytics. Try asking me something like 'Tell me about John Doe's performance' or 'What's the average rating for Engineering department?'",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // State for storing data from API
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    departments: []
  });

  // Load data from API on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [employeesResponse, departmentsResponse] = await Promise.all([
        employeeAPI.getEmployees(),
        departmentAPI.getDepartments()
      ]);
      
      setEmployeeData({
        employees: employeesResponse.employees || [],
        departments: departmentsResponse || []
      });
    } catch (error) {
      console.error('Error loading data for chatbot:', error);
      // Fallback to empty data
      setEmployeeData({ employees: [], departments: [] });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple RAG implementation
  const retrieveRelevantData = (query) => {
    const queryLower = query.toLowerCase();
    const relevantData = [];

    // Search through employees
    employeeData.employees.forEach(employee => {
      if (queryLower.includes(employee.name.toLowerCase()) || 
          queryLower.includes(employee.department.toLowerCase()) ||
          queryLower.includes(employee.position.toLowerCase())) {
        relevantData.push({
          type: 'employee',
          data: employee
        });
      }
    });

    // Search through departments
    employeeData.departments.forEach(dept => {
      if (queryLower.includes(dept.name.toLowerCase())) {
        relevantData.push({
          type: 'department',
          data: dept
        });
      }
    });

    return relevantData;
  };

  // Generate response using retrieved data
  const generateResponse = async (query, relevantData) => {
    if (relevantData.length === 0) {
      return "I couldn't find specific information about that. Please try asking about an employee by name, department, or ask general questions about performance data. Make sure the backend server is running.";
    }

    let response = "";
    
    for (const item of relevantData) {
      if (item.type === 'employee') {
        const emp = item.data;
        response += `**${emp.name}** (${emp.position})\n`;
        response += `- Department: ${emp.department}\n`;
        response += `- Email: ${emp.email}\n`;
        response += `- Hire Date: ${new Date(emp.hireDate).toLocaleDateString()}\n`;
        response += `- Status: ${emp.status}\n`;
        if (emp.phone) response += `- Phone: ${emp.phone}\n`;
        response += `\n`;
        
        // Try to get performance data
        try {
          const performanceData = await employeeAPI.getEmployeePerformance(emp._id);
          if (performanceData && performanceData.length > 0) {
            const latestReview = performanceData[0];
            response += `**Latest Performance Review:**\n`;
            response += `- Rating: ${latestReview.overallRating}/5\n`;
            response += `- Review Date: ${new Date(latestReview.reviewDate).toLocaleDateString()}\n`;
            response += `- Status: ${latestReview.status}\n`;
            if (latestReview.achievements) {
              response += `- Achievements: ${latestReview.achievements}\n`;
            }
            response += `\n`;
          }
        } catch (error) {
          console.error('Error fetching performance data:', error);
        }
      } else if (item.type === 'department') {
        const dept = item.data;
        response += `**${dept.name} Department:**\n`;
        response += `- Total Employees: ${dept.metrics?.totalEmployees || 'N/A'}\n`;
        response += `- Average Rating: ${dept.metrics?.averageRating || 'N/A'}/5\n`;
        response += `- Reviews Completed: ${dept.metrics?.reviewsCompleted || 'N/A'}\n`;
        if (dept.description) response += `- Description: ${dept.description}\n`;
        response += `\n`;
      }
    }

    return response || "I found some information but couldn't generate a proper response. Please try rephrasing your question.";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Process the query
    setTimeout(async () => {
      try {
        const relevantData = retrieveRelevantData(inputText);
        const botResponse = await generateResponse(inputText, relevantData);

        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error generating response:', error);
        const errorMessage = {
          id: Date.now() + 1,
          text: "Sorry, I encountered an error while processing your request. Please make sure the backend server is running.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h3>Performance Assistant</h3>
        <div className="status-indicator">
          <span className="status-dot"></span>
          Online
        </div>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.sender === 'bot' ? (
                <div className="bot-message">
                  <div className="bot-avatar">🤖</div>
                  <div className="message-text">
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {message.text}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="user-message">
                  <div className="message-text">{message.text}</div>
                  <div className="user-avatar">👤</div>
                </div>
              )}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="bot-message">
                <div className="bot-avatar">🤖</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about employees, performance, or departments..."
            rows="1"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
