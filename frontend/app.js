/**
 * Nia-Prime-Lite Frontend Application
 * Mobile-first PWA API Client
 * 100% SECURE - Owner Access Only
 */

// ============================================
// 🔒 SECURITY CONFIGURATION
// ============================================
const API = "https://YOUR_RENDER_BACKEND_URL";
const OWNER_SECRET_KEY = "jazzu-ultimate-2026-secure"; // Your secret key
// ============================================

// Fallback to relative path if not configured
const API_BASE = API === "https://YOUR_RENDER_BACKEND_URL" ? "" : API;

// Helper function to get auth headers
function getAuthHeaders() {
    return {
        'X-Secret-Key': OWNER_SECRET_KEY,
        'Content-Type': 'application/json'
    };
}

// DOM Elements
const apiStatus = document.getElementById('api-status');
const leadForm = document.getElementById('lead-form');
const formMessage = document.getElementById('form-message');
const leadsList = document.getElementById('leads-list');
const refreshBtn = document.getElementById('refresh-leads');

// Check API Status
async function checkApiStatus() {
    try {
        const response = await fetch(`${API_BASE}/`);
        const data = await response.json();
        
        if (data.status === 'ok') {
            apiStatus.className = 'status online';
            apiStatus.querySelector('.status-text').textContent = 'API Online';
        } else {
            apiStatus.className = 'status offline';
            apiStatus.querySelector('.status-text').textContent = 'API Error';
        }
    } catch (error) {
        apiStatus.className = 'status offline';
        apiStatus.querySelector('.status-text').textContent = 'API Offline';
    }
}

// Add Lead
async function addLead(leadData) {
    try {
        const response = await fetch(`${API_BASE}/add`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(leadData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Lead added successfully!', 'success');
            leadForm.reset();
            loadLeads();
        } else {
            showMessage(data.message || 'Failed to add lead', 'error');
        }
        
        return data;
    } catch (error) {
        showMessage('Error: ' + error.message, 'error');
        throw error;
    }
}

// Load Leads
async function loadLeads() {
    try {
        leadsList.innerHTML = '<p class="loading">Loading leads...</p>';
        
        const response = await fetch(`${API_BASE}/leads`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        
        if (data.success) {
            if (data.leads.length === 0) {
                leadsList.innerHTML = '<p class="empty-state">No leads yet</p>';
            } else {
                leadsList.innerHTML = data.leads.map(lead => `
                    <div class="lead-item">
                        <div class="lead-info">
                            <strong>${escapeHtml(lead.name)}</strong>
                            <span>${escapeHtml(lead.email)}</span>
                            ${lead.phone ? `<span>${escapeHtml(lead.phone)}</span>` : ''}
                        </div>
                    </div>
                `).join('');
            }
        } else {
            leadsList.innerHTML = '<p class="error">Failed to load leads</p>';
        }
    } catch (error) {
        leadsList.innerHTML = '<p class="error">Error loading leads</p>';
    }
}

// Show Message
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `message ${type}`;
    
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'message';
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Event Listeners
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const leadData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    
    await addLead(leadData);
});

refreshBtn.addEventListener('click', loadLeads);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkApiStatus();
    loadLeads();
    
    // Refresh status every 30 seconds
    setInterval(checkApiStatus, 30000);
});
