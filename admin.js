// NICE Computer Education - School of Coding, Yavatmal
// Admin Dashboard Controller

const ADMIN_CREDENTIALS = {
  user: 'nice_yavatmal',
  pass: 'Coding@445002'
};

// DOM References
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

const statTotalReviews = document.getElementById('statTotalReviews');
const statGoogleReviews = document.getElementById('statGoogleReviews');
const statGrievances = document.getElementById('statGrievances');
const statAvgRating = document.getElementById('statAvgRating');

const searchInput = document.getElementById('searchInput');
const filterRatingSelect = document.getElementById('filterRatingSelect');
const recordCount = document.getElementById('recordCount');
const reviewsTableBody = document.getElementById('reviewsTableBody');
const exportExcelBtn = document.getElementById('exportExcelBtn');
const clearRecordsBtn = document.getElementById('clearRecordsBtn');

// Check Authentication
function checkAuth() {
  const isAuth = sessionStorage.getItem('nice_admin_authenticated') === 'true';
  if (isAuth) {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    renderDashboard();
  } else {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
  }
}

// Login Submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = usernameInput.value.trim();
  const p = passwordInput.value.trim();

  if (u === ADMIN_CREDENTIALS.user && p === ADMIN_CREDENTIALS.pass) {
    sessionStorage.setItem('nice_admin_authenticated', 'true');
    loginError.classList.add('hidden');
    checkAuth();
  } else {
    loginError.textContent = 'Invalid username or password. Please try again.';
    loginError.classList.remove('hidden');
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('nice_admin_authenticated');
  checkAuth();
});

// Fetch Reviews (Strictly Real Reviews Only - Auto-purges any mock/demo data)
function getReviews() {
  const raw = JSON.parse(localStorage.getItem('nice_reviews_db') || '[]');
  // Filter out any demo sample records
  const realOnly = raw.filter(r => !r.id || !r.id.startsWith('REV-NC'));
  if (realOnly.length !== raw.length) {
    localStorage.setItem('nice_reviews_db', JSON.stringify(realOnly));
  }
  return realOnly;
}

// Render Dashboard Metrics & Table
function renderDashboard() {
  const reviews = getReviews();
  const total = reviews.length;
  const googleList = reviews.filter(r => r.rating >= 4);
  const grievanceList = reviews.filter(r => r.rating < 4);

  statTotalReviews.textContent = total;
  statGoogleReviews.textContent = googleList.length;
  statGrievances.textContent = grievanceList.length;

  if (total > 0) {
    const sum = reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    statAvgRating.textContent = (sum / total).toFixed(1) + ' ★';
  } else {
    statAvgRating.textContent = '5.0 ★';
  }

  renderTable();
}

// Render Table
function renderTable() {
  const reviews = getReviews();
  const query = searchInput.value.toLowerCase().trim();
  const ratingFilter = filterRatingSelect.value;

  const filtered = reviews.filter((r) => {
    const matchesQuery = 
      (r.name && r.name.toLowerCase().includes(query)) ||
      (r.course && r.course.toLowerCase().includes(query)) ||
      (r.reviewText && r.reviewText.toLowerCase().includes(query));

    let matchesRating = true;
    if (ratingFilter === '5') matchesRating = r.rating === 5;
    else if (ratingFilter === '4') matchesRating = r.rating === 4;
    else if (ratingFilter === 'grievances') matchesRating = r.rating < 4;

    return matchesQuery && matchesRating;
  });

  recordCount.textContent = filtered.length;

  if (filtered.length === 0) {
    reviewsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="p-10 text-center text-slate-400">
          <div class="text-3xl mb-2">🎓</div>
          <div class="font-bold text-slate-700 text-sm">No Student Reviews Logged Yet</div>
          <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Real student reviews will appear here automatically when students generate &amp; submit reviews via the student app.</p>
        </td>
      </tr>
    `;
    return;
  }

  reviewsTableBody.innerHTML = filtered.map((r) => {
    const dateFormatted = new Date(r.timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const isGoogle = r.rating >= 4;
    const statusPill = isGoogle
      ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Google Review</span>`
      : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">⚠ Grievance Caught</span>`;

    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3.5 pl-5 text-slate-500 whitespace-nowrap">${dateFormatted}</td>
        <td class="p-3.5">
          <div class="font-bold text-slate-900">${escapeHtml(r.name)}</div>
          <div class="text-[10px] text-slate-400 uppercase">${escapeHtml(r.stream || 'coding')}</div>
        </td>
        <td class="p-3.5">
          <span class="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-[11px]">${escapeHtml(r.course)}</span>
        </td>
        <td class="p-3.5 whitespace-nowrap">
          <span class="text-amber-500 font-bold">${stars}</span>
          <span class="text-[11px] text-slate-400 font-semibold ml-1">(${r.rating}★)</span>
        </td>
        <td class="p-3.5">${statusPill}</td>
        <td class="p-3.5 pr-5 max-w-xs text-slate-600 line-clamp-2">
          ${escapeHtml(r.reviewText)}
          ${r.hasPhoto ? `<span class="ml-1 text-emerald-600 font-bold text-[10px]">📸 Photo</span>` : ''}
        </td>
      </tr>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Excel Export (UTF-8 BOM CSV)
exportExcelBtn.addEventListener('click', () => {
  const reviews = getReviews();
  if (reviews.length === 0) {
    alert('No reviews found to export!');
    return;
  }

  const headers = ['Record ID', 'Timestamp', 'Student Name', 'Course Stream', 'Course Name', 'Rating', 'Status', 'Feedback / Review Note'];
  
  const rows = reviews.map(r => [
    r.id || '',
    new Date(r.timestamp).toLocaleString('en-IN'),
    `"${(r.name || '').replace(/"/g, '""')}"`,
    `"${(r.stream || '').replace(/"/g, '""')}"`,
    `"${(r.course || '').replace(/"/g, '""')}"`,
    r.rating,
    r.status === 'copied_google' ? 'Google Review' : 'Grievance Handled',
    `"${(r.reviewText || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `NICE_Computer_Education_Reviews_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Clear All Records Action
if (clearRecordsBtn) {
  clearRecordsBtn.addEventListener('click', () => {
    const current = getReviews();
    if (current.length === 0) {
      alert('No review records exist to clear.');
      return;
    }
    if (confirm('Are you sure you want to clear all review logs? Only new genuine student reviews will be recorded.')) {
      localStorage.removeItem('nice_reviews_db');
      renderDashboard();
    }
  });
}

// Filter & Search Listeners
searchInput.addEventListener('input', renderTable);
filterRatingSelect.addEventListener('change', renderTable);

document.addEventListener('DOMContentLoaded', checkAuth);
