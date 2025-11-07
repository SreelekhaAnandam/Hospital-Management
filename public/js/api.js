// API Utility Functions for Hospital Management System

// Dynamically set API base URL based on environment
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : window.location.origin;

// Get stored user data
function getStoredUser() {
  const userStr = sessionStorage.getItem('loggedInUser');
  return userStr ? JSON.parse(userStr) : null;
}

// Get JWT token
function getToken() {
  const user = getStoredUser();
  return user ? user.token : null;
}

// Check if user is authenticated
function isAuthenticated() {
  return !!getToken();
}

// Redirect to login if not authenticated
function requireAuth(requiredRole = null) {
  const user = getStoredUser();
  
  if (!user || !user.token) {
    window.location.href = `${API_BASE_URL}/login.html`;
    return false;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    alert('Access denied. You do not have permission to access this page.');
    window.location.href = `${API_BASE_URL}/login.html`;
    return false;
  }
  
  return true;
}

// Make authenticated API request
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle authentication errors
    if (response.status === 401) {
      sessionStorage.clear();
      window.location.href = `${API_BASE_URL}/login.html`;
      throw new Error('Session expired. Please login again.');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// API Methods

// Patient APIs
const PatientAPI = {
  // Get patient profile
  getProfile: async () => {
    return await apiRequest('/api/patients/profile', {
      method: 'GET'
    });
  },
  
  // Create or update patient profile
  saveProfile: async (profileData) => {
    return await apiRequest('/api/patients/profile', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  },
  
  // Get all patients (admin/doctor only)
  getAll: async () => {
    return await apiRequest('/api/patients', {
      method: 'GET'
    });
  }
};

// Appointment APIs
const AppointmentAPI = {
  // Create appointment
  create: async (appointmentData) => {
    return await apiRequest('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  },
  
  // Get user's appointments
  getMy: async () => {
    return await apiRequest('/api/appointments/my', {
      method: 'GET'
    });
  },
  
  // Get all appointments (admin/doctor only)
  getAll: async () => {
    return await apiRequest('/api/appointments', {
      method: 'GET'
    });
  },
  
  // Update appointment status
  updateStatus: async (id, status) => {
    return await apiRequest(`/api/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },
  
  // Cancel appointment
  cancel: async (id) => {
    return await apiRequest(`/api/appointments/${id}`, {
      method: 'DELETE'
    });
  }
};

// Doctor APIs
const DoctorAPI = {
  // Get current doctor's profile
  getProfile: async () => {
    return await apiRequest('/api/doctors/profile', {
      method: 'GET'
    });
  },
  
  // Update doctor profile
  updateProfile: async (profileData) => {
    return await apiRequest('/api/doctors/profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData)
    });
  },
  
  // Get all doctors
  getAll: async () => {
    return await apiRequest('/api/doctors', {
      method: 'GET'
    });
  },
  
  // Get doctor by specialization
  getBySpecialization: async (specialization) => {
    return await apiRequest(`/api/doctors?specialization=${specialization}`, {
      method: 'GET'
    });
  }
};

// Auth APIs
const AuthAPI = {
  // Get current user
  getCurrentUser: async () => {
    return await apiRequest('/api/auth/me', {
      method: 'GET'
    });
  }
};

// Logout function
function logout() {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = `${API_BASE_URL}/login.html`;
}

// Export for use in other files (Node.js environment)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    API_BASE_URL,
    getStoredUser,
    getToken,
    isAuthenticated,
    requireAuth,
    apiRequest,
    PatientAPI,
    AppointmentAPI,
    DoctorAPI,
    AuthAPI,
    logout
  };
}
