/* ============================================================
   Microeconomics for Policy — Interactive Textbook
   Core JavaScript Framework

   MODULES:
   1. EconGraph - D3.js graph utilities for econ diagrams
   2. SidebarNav - active section tracking
   3. CheckUnderstanding - inline multiple-choice feedback
   4. PracticeQuiz - standalone quiz rendering
   5. SelfCheck - reveal-answer checks
   6. CumulativeGlossary and Flashcards - key terms study tools
   7. DrawGraph - click-to-draw graph practice
   ============================================================ */

/* -------------------------------------------------------
   1. ECON GRAPH — D3.js Utility Library
   Clean, consistent economics graph primitives.
   All graphs use this for uniform styling.
   ------------------------------------------------------- */
const EconGraph = {

  /* Default configuration merged with user options */
  defaults: {
    width: 520,
    height: 380,
    margin: { top: 30, right: 30, bottom: 50, left: 60 },
    xLabel: 'Quantity',
    yLabel: 'Price',
    xDomain: [0, 100],
    yDomain: [0, 100],
    gridLines: true,
    animate: true,
    animationDuration: 400
  },

  /**
   * Create a new graph instance inside a container.
   * @param {string} selector - CSS selector for the container element
   * @param {object} options - Override defaults
   * @returns {object} graph context with svg, scales, and helper methods
   */
  create(selector, options = {}) {
    const config = { ...this.defaults, ...options };
    const { width, height, margin } = config;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    const container = document.querySelector(selector);
    if (!container) return null;
    container.innerHTML = '';

    const svg = d3.select(selector)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('max-width', `${width}px`)
      .style('width', '100%');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain(config.xDomain)
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(config.yDomain)
      .range([innerHeight, 0]);

    // Grid lines
    if (config.gridLines) {
      g.append('g')
        .attr('class', 'grid grid--x')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale)
          .ticks(8)
          .tickSize(-innerHeight)
          .tickFormat('')
        )
        .selectAll('line')
        .style('stroke', '#e8e8e8')
        .style('stroke-dasharray', '2,2');

      g.append('g')
        .attr('class', 'grid grid--y')
        .call(d3.axisLeft(yScale)
          .ticks(8)
          .tickSize(-innerWidth)
          .tickFormat('')
        )
        .selectAll('line')
        .style('stroke', '#e8e8e8')
        .style('stroke-dasharray', '2,2');

      g.selectAll('.grid .domain').remove();
    }

    // Axes
    const xAxis = g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(8));

    const yAxis = g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(8));

    // Style axes
    g.selectAll('.axis text')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '12px')
      .style('fill', '#566573');

    g.selectAll('.axis line, .axis .domain')
      .style('stroke', '#aab7b8');

    // Axis labels
    svg.append('text')
      .attr('class', 'axis-label axis-label--x')
      .attr('x', margin.left + innerWidth / 2)
      .attr('y', height - 8)
      .attr('text-anchor', 'middle')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', '#2c3e50')
      .text(config.xLabel);

    svg.append('text')
      .attr('class', 'axis-label axis-label--y')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(margin.top + innerHeight / 2))
      .attr('y', 16)
      .attr('text-anchor', 'middle')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', '#2c3e50')
      .text(config.yLabel);

    // Add clip-path so lines/areas don't overflow the plot area
    const clipId = 'clip-' + selector.replace(/[^a-zA-Z0-9]/g, '');
    svg.append('defs').append('clipPath')
      .attr('id', clipId)
      .append('rect')
      .attr('x', 0).attr('y', 0)
      .attr('width', innerWidth)
      .attr('height', innerHeight);
    g.attr('clip-path', `url(#${clipId})`);

    // Re-append axes on top of clip group so they remain visible
    const axisLayer = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    xAxis.remove();
    yAxis.remove();
    const xAxisNew = axisLayer.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(8));
    const yAxisNew = axisLayer.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(8));

    axisLayer.selectAll('.axis text')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '12px')
      .style('fill', '#566573');
    axisLayer.selectAll('.axis line, .axis .domain')
      .style('stroke', '#aab7b8');

    // Return the graph context
    const ctx = {
      svg, g, xScale, yScale, xAxis: xAxisNew, yAxis: yAxisNew, config,
      innerWidth, innerHeight, axisLayer
    };

    // Attach helper methods
    ctx.addLine = (data, color, opts = {}) => this.addLine(ctx, data, color, opts);
    ctx.addArea = (data, color, opts = {}) => this.addArea(ctx, data, color, opts);
    ctx.addPoint = (x, y, opts = {}) => this.addPoint(ctx, x, y, opts);
    ctx.addDashedLine = (points, color, opts = {}) => this.addDashedLine(ctx, points, color, opts);
    ctx.addLabel = (x, y, text, opts = {}) => this.addLabel(ctx, x, y, text, opts);
    ctx.addShaded = (data, color, opts = {}) => this.addShaded(ctx, data, color, opts);

    /**
     * Clear plotted content while preserving the graph frame.
     * Call this before redrawing slider updates or step-through frames.
     */
    ctx.clear = () => {
      ctx.g.selectAll('.graph-line, .graph-area, .graph-point, .graph-reference, .graph-label, .dynamic').remove();
      if (ctx.axisLayer) {
        ctx.axisLayer.selectAll('.graph-label, .dynamic').remove();
      }
    };

    return ctx;
  },

  /**
   * Add a line (e.g., a demand or supply curve)
   * @param {object} ctx - graph context
   * @param {Array} data - [{x, y}, ...] or a function f(x) => y
   * @param {string} color - CSS color
   * @param {object} opts - { strokeWidth, dashed, label, className }
   */
  addLine(ctx, data, color, opts = {}) {
    const {
      strokeWidth = 2.5,
      dashed = false,
      label = null,
      className = '',
      id = null
    } = opts;

    // If data is a function, generate points
    let points = data;
    if (typeof data === 'function') {
      const [xMin, xMax] = ctx.config.xDomain;
      points = [];
      for (let x = xMin; x <= xMax; x += (xMax - xMin) / 200) {
        const y = data(x);
        if (y !== null && y !== undefined && isFinite(y)) {
          points.push({ x, y });
        }
      }
    }

    const line = d3.line()
      .x(d => ctx.xScale(d.x))
      .y(d => ctx.yScale(d.y))
      .curve(d3.curveMonotoneX);

    const path = ctx.g.append('path')
      .datum(points)
      .attr('class', `graph-line ${className}`)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth);

    if (id) path.attr('id', id);
    if (dashed) path.attr('stroke-dasharray', '8,4');

    // Optional label at end of line — with white background for readability
    if (label && points.length > 0) {
      const lastPoint = points[points.length - 1];
      const labelG = ctx.g.append('g')
        .attr('class', `graph-label ${className}`);
      // White background rect (sized after text renders)
      const bgRect = labelG.append('rect')
        .attr('fill', '#fff')
        .attr('rx', 2).attr('ry', 2)
        .attr('opacity', 0.85);
      const labelText = labelG.append('text')
        .attr('x', ctx.xScale(lastPoint.x) + 8)
        .attr('y', ctx.yScale(lastPoint.y) + 4)
        .style('font-family', "'Public Sans', sans-serif")
        .style('font-size', '13px')
        .style('font-weight', '700')
        .style('fill', color)
        .text(label);
      // Size the background to fit the text
      try {
        const bbox = labelText.node().getBBox();
        bgRect.attr('x', bbox.x - 2).attr('y', bbox.y - 1)
          .attr('width', bbox.width + 4).attr('height', bbox.height + 2);
      } catch(e) { /* getBBox can fail if not rendered yet */ }
    }

    return path;
  },

  /**
   * Add a shaded area between two y-functions over an x-range
   */
  addShaded(ctx, data, color, opts = {}) {
    const { opacity = 0.15, className = '', id = null } = opts;
    // data: { xRange: [x0, x1], yTop: f(x), yBottom: f(x) }

    const nPoints = 100;
    const [x0, x1] = data.xRange;
    const step = (x1 - x0) / nPoints;
    const areaData = [];

    for (let x = x0; x <= x1; x += step) {
      areaData.push({
        x,
        y0: typeof data.yBottom === 'function' ? data.yBottom(x) : data.yBottom,
        y1: typeof data.yTop === 'function' ? data.yTop(x) : data.yTop
      });
    }

    const area = d3.area()
      .x(d => ctx.xScale(d.x))
      .y0(d => ctx.yScale(d.y0))
      .y1(d => ctx.yScale(d.y1))
      .curve(d3.curveMonotoneX);

    const path = ctx.g.append('path')
      .datum(areaData)
      .attr('class', `graph-area ${className}`)
      .attr('d', area)
      .attr('fill', color)
      .attr('opacity', opacity);

    if (id) path.attr('id', id);
    return path;
  },

  /**
   * Add a point (e.g., equilibrium marker)
   */
  addPoint(ctx, x, y, opts = {}) {
    const {
      radius = 5,
      color = '#1a5276',
      label = null,
      labelOffset = { dx: 8, dy: -10 },
      className = ''
    } = opts;

    ctx.g.append('circle')
      .attr('class', `graph-point ${className}`)
      .attr('cx', ctx.xScale(x))
      .attr('cy', ctx.yScale(y))
      .attr('r', radius)
      .attr('fill', color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    if (label) {
      const labelG = ctx.g.append('g').attr('class', `graph-label ${className}`);
      const bgRect = labelG.append('rect')
        .attr('fill', '#fff').attr('rx', 2).attr('ry', 2).attr('opacity', 0.85);
      const labelText = labelG.append('text')
        .attr('x', ctx.xScale(x) + labelOffset.dx)
        .attr('y', ctx.yScale(y) + labelOffset.dy)
        .style('font-family', "'Public Sans', sans-serif")
        .style('font-size', '13px')
        .style('font-weight', '700')
        .style('fill', color)
        .text(label);
      try {
        const bbox = labelText.node().getBBox();
        bgRect.attr('x', bbox.x - 2).attr('y', bbox.y - 1)
          .attr('width', bbox.width + 4).attr('height', bbox.height + 2);
      } catch(e) {}
    }
  },

  /**
   * Add a dashed reference line (e.g., from equilibrium to axes)
   */
  addDashedLine(ctx, points, color, opts = {}) {
    const { strokeWidth = 1.5, className = '' } = opts;
    const line = d3.line()
      .x(d => ctx.xScale(d.x))
      .y(d => ctx.yScale(d.y));

    ctx.g.append('path')
      .datum(points)
      .attr('class', `graph-reference ${className}`)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth)
      .attr('stroke-dasharray', '5,4')
      .attr('opacity', 0.6);
  },

  /**
   * Add a text label at any position
   */
  addLabel(ctx, x, y, text, opts = {}) {
    const {
      color = '#2c3e50',
      fontSize = '13px',
      fontWeight = '600',
      anchor = 'start',
      className = '',
      background = true
    } = opts;

    // Use axisLayer (outside clip-path) so labels aren't clipped
    const layer = ctx.axisLayer || ctx.g;
    const labelG = layer.append('g').attr('class', `graph-label ${className}`);
    const bgRect = background ? labelG.append('rect')
      .attr('fill', '#fff').attr('rx', 2).attr('ry', 2).attr('opacity', 0.85) : null;
    const labelText = labelG.append('text')
      .attr('x', ctx.xScale(x))
      .attr('y', ctx.yScale(y))
      .attr('text-anchor', anchor)
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', fontSize)
      .style('font-weight', fontWeight)
      .style('fill', color)
      .text(text);
    if (bgRect) {
      try {
        const bbox = labelText.node().getBBox();
        bgRect.attr('x', bbox.x - 3).attr('y', bbox.y - 1)
          .attr('width', bbox.width + 6).attr('height', bbox.height + 2);
      } catch(e) {}
    }
    return labelG;
  }
};


/* -------------------------------------------------------
   3. SIDEBAR NAVIGATION
   Highlights the current section in the sidebar as you scroll
   ------------------------------------------------------- */
const SidebarNav = {
  init() {
    const headings = document.querySelectorAll('.main-content h2[id], .main-content h3[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar__link');

    if (!headings.length || !sidebarLinks.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          sidebarLinks.forEach(link => {
            link.classList.toggle(
              'sidebar__link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    headings.forEach(h => observer.observe(h));
  }
};


/* -------------------------------------------------------
   4. CHECK FOR UNDERSTANDING
   Interactive multiple-choice quiz with instant feedback.
   Usage in HTML:
     <div class="check-understanding" data-question="What happens to..."
          data-correct="1"
          data-explanation="Because the monopolist must lower price for all units...">
       <div class="check-understanding__option" data-index="0">A) Price stays the same</div>
       <div class="check-understanding__option" data-index="1">B) Marginal revenue falls below price</div>
       <div class="check-understanding__option" data-index="2">C) Total revenue always increases</div>
       <div class="check-understanding__option" data-index="3">D) The firm produces more</div>
     </div>
   ------------------------------------------------------- */
const CheckUnderstanding = {
  init() {
    document.querySelectorAll('.check-understanding').forEach(container => {
      const question = container.dataset.question;
      const correctIdx = parseInt(container.dataset.correct, 10);
      const explanation = container.dataset.explanation;
      const options = container.querySelectorAll('.check-understanding__option');
      let answered = false;

      // Build header
      const header = document.createElement('div');
      header.className = 'check-understanding__header';
      header.textContent = 'Self-Check Your Understanding';
      container.insertBefore(header, container.firstChild);

      // Build question text
      if (question) {
        const qEl = document.createElement('div');
        qEl.className = 'check-understanding__question';
        qEl.textContent = question;
        header.insertAdjacentElement('afterend', qEl);
      }

      // Build feedback area
      const feedback = document.createElement('div');
      feedback.className = 'check-understanding__feedback';
      feedback.style.display = 'none';
      container.appendChild(feedback);

      options.forEach((opt, idx) => {
        opt.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const isCorrect = idx === correctIdx;

          // Mark all options
          options.forEach((o, i) => {
            o.classList.add('check-understanding__option--answered');
            if (i === correctIdx) {
              o.classList.add('check-understanding__option--correct');
            } else if (i === idx && !isCorrect) {
              o.classList.add('check-understanding__option--incorrect');
            }
          });

          // Show feedback
          feedback.style.display = 'block';
          feedback.className = 'check-understanding__feedback ' +
            (isCorrect ? 'check-understanding__feedback--correct' : 'check-understanding__feedback--incorrect');
          feedback.innerHTML = (isCorrect ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') +
            (explanation || '');
        });
      });
    });
  }
};


/* -------------------------------------------------------
   5. PRACTICE QUIZ ENGINE
   Multi-question quiz with progress, feedback, scoring.
   Usage:
     PracticeQuiz.create('#quiz-container', questions)
   where questions = [
     { type: 'multiple_choice', text: '...', options: [{text,correct}], feedback: '...' },
     { type: 'short_answer', text: '...', correctAnswer: '4.0', feedback: '...' }
   ]
   ------------------------------------------------------- */
const PracticeQuiz = {

  create(selector, questions, opts = {}) {
    const container = document.querySelector(selector);
    if (!container || !questions.length) return;

    // Filter out meta/instruction-only questions (no options and no correctAnswer)
    const validQs = questions.filter(q =>
      (q.type === 'multiple_choice' && q.options && q.options.length > 0 && q.options.some(o => o.text && o.text.trim() && o.text.trim() !== '&nbsp;')) ||
      (q.type === 'short_answer' && q.correctAnswer)
    );

    if (!validQs.length) {
      container.innerHTML = '<p style="color: #7f8c8d; font-style: italic;">No quiz questions available.</p>';
      return;
    }

    const title = opts.title || 'Practice Quiz';
    const state = {
      current: 0,
      answers: new Array(validQs.length).fill(null),
      checked: new Array(validQs.length).fill(false),
      correct: new Array(validQs.length).fill(false)
    };

    function cleanHTML(str) {
      if (!str) return '';
      return str.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    }

    function renderMath() {
      if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(container, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\(', right: '\\)', display: false}
          ]
        });
      }
    }

    function getTolerance(q, correctAnswer) {
      return q.tolerance !== undefined ? parseFloat(q.tolerance) : Math.max(0.01 * Math.abs(correctAnswer), 0.5);
    }

    function checkQuestion(index) {
      const q = validQs[index];
      state.checked[index] = true;

      if (q.type === 'multiple_choice') {
        const selectedIdx = state.answers[index];
        state.correct[index] = selectedIdx !== null && q.options[selectedIdx]?.correct === true;
      } else if (q.type === 'short_answer') {
        const userAnswer = parseFloat(state.answers[index]);
        const correctAnswer = parseFloat(q.correctAnswer);
        const tolerance = getTolerance(q, correctAnswer);
        state.correct[index] = !isNaN(userAnswer) && !isNaN(correctAnswer) &&
          Math.abs(userAnswer - correctAnswer) <= tolerance;
      }
    }

    function renderQuestionMeta(q) {
      if (!q.module && !q.skill) return '';
      return `
        <div class="practice-quiz__meta">
          ${q.module ? `<span class="practice-quiz__tag">${cleanHTML(q.module)}</span>` : ''}
          ${q.skill ? `<span class="practice-quiz__tag practice-quiz__tag--skill">${cleanHTML(q.skill)}</span>` : ''}
        </div>
      `;
    }

    function renderAll() {
      const checkedCount = state.checked.filter(Boolean).length;
      const pct = Math.round((checkedCount / validQs.length) * 100);
      const allChecked = checkedCount === validQs.length;
      const numCorrect = state.correct.filter(Boolean).length;

      let html = `
        <div class="practice-quiz practice-quiz--all">
          <div class="practice-quiz__header">
            <div class="practice-quiz__title">${title}</div>
            <div class="practice-quiz__progress">${checkedCount} / ${validQs.length} checked</div>
          </div>
          <div class="practice-quiz__progress-bar">
            <div class="practice-quiz__progress-fill" style="width: ${pct}%"></div>
          </div>
          <div class="practice-quiz__all-body">
      `;

      validQs.forEach((q, qIndex) => {
        const isChecked = state.checked[qIndex];
        html += `
          <section class="practice-quiz__item" data-question-index="${qIndex}">
            <div class="practice-quiz__question-number">Question ${qIndex + 1}</div>
            ${renderQuestionMeta(q)}
            <div class="practice-quiz__question-text">${cleanHTML(q.text)}</div>
        `;

        if (q.type === 'multiple_choice') {
          html += '<div class="practice-quiz__options">';
          const letters = 'ABCDEFGHIJ';
          q.options.forEach((opt, i) => {
            const optText = cleanHTML(opt.text);
            if (!optText) return;
            let cls = 'practice-quiz__option';
            if (isChecked) {
              cls += ' practice-quiz__option--disabled';
              if (opt.correct) cls += ' practice-quiz__option--correct';
              else if (state.answers[qIndex] === i) cls += ' practice-quiz__option--incorrect';
            } else if (state.answers[qIndex] === i) {
              cls += ' practice-quiz__option--selected';
            }
            html += `<div class="${cls}" data-question-index="${qIndex}" data-idx="${i}">
              <span class="practice-quiz__option-letter">${letters[i]}.</span>
              <span>${optText}</span>
            </div>`;
          });
          html += '</div>';
          if (!isChecked) {
            html += `<button class="practice-quiz__btn practice-quiz__btn--primary practice-quiz__check-one" data-question-index="${qIndex}" ${state.answers[qIndex] === null ? 'disabled' : ''}>Check Answer</button>`;
          }
        } else if (q.type === 'short_answer') {
          const val = state.answers[qIndex] || '';
          let inputCls = 'practice-quiz__input';
          if (isChecked) {
            inputCls += state.correct[qIndex] ? ' practice-quiz__input--correct' : ' practice-quiz__input--incorrect';
          }
          html += `<div class="practice-quiz__input-group">
            <input type="text" class="${inputCls}" data-question-index="${qIndex}" placeholder="Enter your answer..." value="${val}" ${isChecked ? 'disabled' : ''}>
            ${!isChecked ? `<button class="practice-quiz__btn practice-quiz__btn--primary practice-quiz__check-one" data-question-index="${qIndex}" ${state.answers[qIndex] ? '' : 'disabled'}>Check Answer</button>` : ''}
          </div>`;
          if (isChecked && !state.correct[qIndex]) {
            html += `<div class="practice-quiz__correct-answer">
              Correct answer: <strong>${q.correctAnswer}</strong>
            </div>`;
          }
        }

        if (isChecked && q.feedback) {
          const fbClass = state.correct[qIndex] ? 'practice-quiz__feedback--correct' : 'practice-quiz__feedback--incorrect';
          html += `<div class="practice-quiz__feedback practice-quiz__feedback--visible ${fbClass}">
            ${state.correct[qIndex] ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> '}
            ${cleanHTML(q.feedback)}
          </div>`;
        }

        html += '</section>';
      });

      html += `
          </div>
          <div class="practice-quiz__nav practice-quiz__nav--sticky">
            <div class="practice-quiz__score-inline">${allChecked ? `${numCorrect} / ${validQs.length} correct` : `${validQs.length - checkedCount} questions unchecked`}</div>
            <div>
              <button class="practice-quiz__btn practice-quiz__btn--secondary" id="pq-retry">Reset Quiz</button>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = html;
      bindAllEvents();
      renderMath();
    }

    function render() {
      const q = validQs[state.current];
      const isChecked = state.checked[state.current];
      const pct = Math.round(((state.current + (isChecked ? 1 : 0)) / validQs.length) * 100);

      let html = `
        <div class="practice-quiz__header">
          <div class="practice-quiz__title">${title}</div>
          <div class="practice-quiz__progress">${state.current + 1} / ${validQs.length}</div>
        </div>
        <div class="practice-quiz__progress-bar">
          <div class="practice-quiz__progress-fill" style="width: ${pct}%"></div>
        </div>
        <div class="practice-quiz__body">
          <div class="practice-quiz__question-number">Question ${state.current + 1}</div>
          ${renderQuestionMeta(q)}
          <div class="practice-quiz__question-text">${cleanHTML(q.text)}</div>
      `;

      if (q.type === 'multiple_choice') {
        html += '<div class="practice-quiz__options">';
        const letters = 'ABCDEFGHIJ';
        q.options.forEach((opt, i) => {
          const optText = cleanHTML(opt.text);
          if (!optText) return;
          let cls = 'practice-quiz__option';
          if (isChecked) {
            cls += ' practice-quiz__option--disabled';
            if (opt.correct) cls += ' practice-quiz__option--correct';
            else if (state.answers[state.current] === i) cls += ' practice-quiz__option--incorrect';
          } else if (state.answers[state.current] === i) {
            cls += ' practice-quiz__option--selected';
          }
          html += `<div class="${cls}" data-idx="${i}">
            <span class="practice-quiz__option-letter">${letters[i]}.</span>
            <span>${optText}</span>
          </div>`;
        });
        html += '</div>';
      } else if (q.type === 'short_answer') {
        const val = state.answers[state.current] || '';
        let inputCls = 'practice-quiz__input';
        if (isChecked) {
          inputCls += state.correct[state.current] ? ' practice-quiz__input--correct' : ' practice-quiz__input--incorrect';
        }
        html += `<div class="practice-quiz__input-group">
          <input type="text" class="${inputCls}" placeholder="Enter your answer..." value="${val}" ${isChecked ? 'disabled' : ''}>
          ${!isChecked ? '<button class="practice-quiz__btn practice-quiz__btn--primary" id="pq-check">Check</button>' : ''}
        </div>`;
        if (isChecked && !state.correct[state.current]) {
          html += `<div style="font-size: 0.875rem; color: var(--color-neutral-600); margin-bottom: var(--space-sm);">
            Correct answer: <strong style="color: var(--color-success);">${q.correctAnswer}</strong>
          </div>`;
        }
      }

      // Feedback
      if (isChecked && q.feedback) {
        const fbClass = state.correct[state.current] ? 'practice-quiz__feedback--correct' : 'practice-quiz__feedback--incorrect';
        html += `<div class="practice-quiz__feedback practice-quiz__feedback--visible ${fbClass}">
          ${state.correct[state.current] ? '<strong>Correct!</strong> ' : '<strong>Not quite.</strong> '}
          ${cleanHTML(q.feedback)}
        </div>`;
      }

      html += '</div>'; // close body

      // Navigation
      html += '<div class="practice-quiz__nav">';
      html += state.current > 0
        ? '<button class="practice-quiz__btn practice-quiz__btn--secondary" id="pq-prev">Previous</button>'
        : '<div></div>';

      if (q.type === 'multiple_choice' && !isChecked) {
        html += `<button class="practice-quiz__btn practice-quiz__btn--primary" id="pq-submit" ${state.answers[state.current] === null ? 'disabled' : ''}>Submit Answer</button>`;
      } else if (isChecked && state.current < validQs.length - 1) {
        html += '<button class="practice-quiz__btn practice-quiz__btn--primary" id="pq-next">Next Question</button>';
      } else if (isChecked && state.current === validQs.length - 1) {
        html += '<button class="practice-quiz__btn practice-quiz__btn--primary" id="pq-finish">See Results</button>';
      } else {
        html += '<div></div>';
      }

      html += '</div>';

      container.innerHTML = html;
      bindEvents();
      renderMath();
    }

    function showResults() {
      const numCorrect = state.correct.filter(Boolean).length;
      const pct = Math.round((numCorrect / validQs.length) * 100);
      container.innerHTML = `
        <div class="practice-quiz__header">
          <div class="practice-quiz__title">${title} — Results</div>
        </div>
        <div class="practice-quiz__progress-bar">
          <div class="practice-quiz__progress-fill" style="width: 100%"></div>
        </div>
        <div class="practice-quiz__results">
          <div class="practice-quiz__score">${numCorrect} / ${validQs.length}</div>
          <div class="practice-quiz__score-label">You answered ${pct}% of questions correctly.</div>
          <p style="color: var(--color-neutral-600); margin-bottom: var(--space-xl); font-size: 0.9375rem;">
            ${pct >= 80 ? 'Great work! You have a strong grasp of this material.' :
              pct >= 50 ? 'Good effort. Consider reviewing the sections where you had difficulty.' :
              'Consider reviewing this module\'s content before moving on. Use the interactive graphs and readings to strengthen your understanding.'}
          </p>
          <button class="practice-quiz__btn practice-quiz__btn--secondary" id="pq-review">Review Answers</button>
          <button class="practice-quiz__btn practice-quiz__btn--primary" id="pq-retry" style="margin-left: var(--space-sm);">Try Again</button>
        </div>
      `;

      renderMath();

      document.getElementById('pq-review')?.addEventListener('click', () => {
        state.current = 0;
        render();
      });
      document.getElementById('pq-retry')?.addEventListener('click', () => {
        state.current = 0;
        state.answers.fill(null);
        state.checked.fill(false);
        state.correct.fill(false);
        render();
      });
    }

    function checkAnswer() {
      checkQuestion(state.current);
      render();
    }

    function bindAllEvents() {
      container.querySelectorAll('.practice-quiz__option:not(.practice-quiz__option--disabled)').forEach(opt => {
        opt.addEventListener('click', () => {
          const qIndex = parseInt(opt.dataset.questionIndex, 10);
          state.answers[qIndex] = parseInt(opt.dataset.idx, 10);
          renderAll();
        });
      });

      container.querySelectorAll('.practice-quiz__input:not([disabled])').forEach(input => {
        input.addEventListener('input', (e) => {
          const qIndex = parseInt(e.target.dataset.questionIndex, 10);
          state.answers[qIndex] = e.target.value;
          const btn = container.querySelector(`.practice-quiz__check-one[data-question-index="${qIndex}"]`);
          if (btn) btn.disabled = !e.target.value.trim();
        });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            const qIndex = parseInt(e.target.dataset.questionIndex, 10);
            checkQuestion(qIndex);
            renderAll();
          }
        });
      });

      container.querySelectorAll('.practice-quiz__check-one').forEach(btn => {
        btn.addEventListener('click', () => {
          const qIndex = parseInt(btn.dataset.questionIndex, 10);
          checkQuestion(qIndex);
          renderAll();
        });
      });

      document.getElementById('pq-retry')?.addEventListener('click', () => {
        state.current = 0;
        state.answers.fill(null);
        state.checked.fill(false);
        state.correct.fill(false);
        renderAll();
      });
    }

    function bindEvents() {
      // MC option selection
      container.querySelectorAll('.practice-quiz__option:not(.practice-quiz__option--disabled)').forEach(opt => {
        opt.addEventListener('click', () => {
          state.answers[state.current] = parseInt(opt.dataset.idx);
          render();
        });
      });

      // Short answer input
      const input = container.querySelector('.practice-quiz__input:not([disabled])');
      if (input) {
        input.addEventListener('input', (e) => {
          state.answers[state.current] = e.target.value;
        });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') checkAnswer();
        });
        // Auto-focus
        input.focus();
      }

      // Buttons
      document.getElementById('pq-check')?.addEventListener('click', checkAnswer);
      document.getElementById('pq-submit')?.addEventListener('click', checkAnswer);
      document.getElementById('pq-prev')?.addEventListener('click', () => { state.current--; render(); });
      document.getElementById('pq-next')?.addEventListener('click', () => { state.current++; render(); });
      document.getElementById('pq-finish')?.addEventListener('click', showResults);
    }

    if (opts.layout === 'all') renderAll();
    else render();
    return { state, render: opts.layout === 'all' ? renderAll : render };
  }
};

PracticeQuiz.loadFromJson = function(selector, url, opts = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = '<p style="color: #7f8c8d; font-style: italic;">Loading quiz questions...</p>';

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Unable to load ${url}`);
      return response.json();
    })
    .then(questions => {
      this.create(selector, questions, opts);
    })
    .catch(() => {
      container.innerHTML = `
        <div class="callout callout--warning">
          <div class="callout__title">Quiz could not load</div>
          <p>Start the site with <code>python3 -m http.server 8000</code> and open <code>http://localhost:8000</code> so the quiz JSON files can load.</p>
        </div>
      `;
    });
};


/* -------------------------------------------------------
   6. SELF-CHECK (Reveal Answer)
   Usage:
     <div class="self-check">
       <div class="self-check__question">What happens when...</div>
       <button class="self-check__reveal-btn">Show Answer</button>
       <div class="self-check__answer">The equilibrium price rises...</div>
     </div>
   ------------------------------------------------------- */
const SelfCheck = {
  init() {
    document.querySelectorAll('.self-check').forEach(container => {
      const btn = container.querySelector('.self-check__reveal-btn');
      const answer = container.querySelector('.self-check__answer');
      if (!btn || !answer) return;

      // Add header if not present
      if (!container.querySelector('.self-check__header')) {
        const header = document.createElement('div');
        header.className = 'self-check__header';
        header.textContent = 'Self-Check Your Understanding';
        container.insertBefore(header, container.firstChild);
      }

      btn.addEventListener('click', () => {
        answer.classList.toggle('self-check__answer--visible');
        btn.textContent = answer.classList.contains('self-check__answer--visible') ? 'Hide Answer' : 'Show Answer';
      });
    });
  }
};


/* -------------------------------------------------------
   7. CUMULATIVE KEY TERMS
   Generates consistent glossary tables and flashcard launchers.
   ------------------------------------------------------- */
const CumulativeGlossary = {
  terms: [
    { module: 1, term: 'Ceteris Paribus', definition: 'Latin for "all else equal"; the assumption that all variables except those being studied are held constant.' },
    { module: 1, term: 'Demand', definition: 'The relationship between price and the quantity consumers are willing and able to purchase.' },
    { module: 1, term: 'Demand Curve', definition: 'A graph showing the relationship between price and quantity demanded, with quantity on the horizontal axis and price on the vertical axis.' },
    { module: 1, term: 'Demand Schedule', definition: 'A table showing quantities demanded at a range of prices.' },
    { module: 1, term: 'Law of Demand', definition: 'Holding all else equal, a higher price leads to a lower quantity demanded, and a lower price leads to a higher quantity demanded.' },
    { module: 1, term: 'Price', definition: 'What a buyer pays for one unit of a good or service.' },
    { module: 1, term: 'Quantity Demanded', definition: 'The number of units consumers are willing to purchase at a given price.' },
    { module: 2, term: 'Law of Supply', definition: 'Holding all else equal, a higher price leads to a greater quantity supplied, and a lower price leads to a lower quantity supplied.' },
    { module: 2, term: 'Quantity Supplied', definition: 'The number of units producers are willing to sell at a given price.' },
    { module: 2, term: 'Supply', definition: 'The relationship between price and the quantity producers are willing and able to sell.' },
    { module: 2, term: 'Supply Curve', definition: 'A graph showing the relationship between price and quantity supplied, with quantity on the horizontal axis and price on the vertical axis.' },
    { module: 2, term: 'Supply Schedule', definition: 'A table showing quantities supplied at a range of prices.' },
    { module: 3, term: 'Equilibrium', definition: 'The price and quantity where quantity demanded equals quantity supplied.' },
    { module: 3, term: 'Equilibrium Price', definition: 'The price at which quantity demanded equals quantity supplied.' },
    { module: 3, term: 'Equilibrium Quantity', definition: 'The quantity bought and sold at the equilibrium price.' },
    { module: 3, term: 'Excess Demand', definition: 'A situation where quantity demanded exceeds quantity supplied at the current price; also called a shortage.' },
    { module: 3, term: 'Excess Supply', definition: 'A situation where quantity supplied exceeds quantity demanded at the current price; also called a surplus.' },
    { module: 3, term: 'Shortage', definition: 'At the existing price, quantity demanded exceeds quantity supplied; also called excess demand.' },
    { module: 3, term: 'Surplus', definition: 'At the existing price, quantity supplied exceeds quantity demanded; also called excess supply.' },
    { module: 4, term: 'Complements', definition: 'Goods often used together, so consumption of one tends to increase consumption of the other.' },
    { module: 4, term: 'Demand Shifter', definition: 'A factor other than the good\'s own price that changes quantity demanded at every price.' },
    { module: 4, term: 'Factors of Production', definition: 'Labor, materials, machinery, and other inputs used to produce goods and services.' },
    { module: 4, term: 'Inferior Good', definition: 'A good whose quantity demanded falls as income rises and rises as income falls.' },
    { module: 4, term: 'Inputs', definition: 'Resources used to produce goods and services; also called factors of production.' },
    { module: 4, term: 'Movement Along a Curve', definition: 'A change in quantity demanded or supplied caused by a change in the good\'s own price.' },
    { module: 4, term: 'Normal Good', definition: 'A good whose quantity demanded rises as income rises and falls as income falls.' },
    { module: 4, term: 'Shift in Demand', definition: 'A change in an economic factor other than price that causes a different quantity to be demanded at every price.' },
    { module: 4, term: 'Shift in Supply', definition: 'A change in an economic factor other than price that causes a different quantity to be supplied at every price.' },
    { module: 4, term: 'Substitute', definition: 'A good that can replace another to some extent, so greater consumption of one can mean less consumption of the other.' },
    { module: 4, term: 'Supply Shifter', definition: 'A factor other than the good\'s own price that changes quantity supplied at every price.' },
    { module: 5, term: 'Allocative Efficiency', definition: 'An outcome where resources are allocated to their highest-value uses and total surplus is maximized.' },
    { module: 5, term: 'Consumer Surplus', definition: 'The benefit consumers receive from buying a good, measured by willingness to pay minus the amount actually paid.' },
    { module: 5, term: 'Deadweight Loss', definition: 'The reduction in total surplus caused by an inefficient outcome or policy.' },
    { module: 5, term: 'Economic Surplus', definition: 'Another name for social surplus or total surplus.' },
    { module: 5, term: 'Producer Surplus', definition: 'The benefit producers receive from selling a good, measured by the price received minus the minimum price they would accept.' },
    { module: 5, term: 'Social Surplus', definition: 'The sum of consumer surplus and producer surplus.' },
    { module: 5, term: 'Total Surplus', definition: 'Another name for social surplus: the total economic benefit generated in a market.' }
  ],

  init() {
    document.querySelectorAll('[data-glossary-through]').forEach(container => {
      const through = parseInt(container.dataset.glossaryThrough, 10);
      const current = parseInt(container.dataset.currentModule || through, 10);
      const terms = this.terms.filter(item => item.module <= through);
      const anchor = container.id || 'key-terms';
      const tableId = `${anchor}-table`;

      container.innerHTML = `
        <h2>Key Terms</h2>
        <p>This cumulative list includes terms introduced through Module ${through}. Terms introduced in this module are marked as new.</p>
        <table class="glossary-table" id="${tableId}">
          <thead>
            <tr>
              <th>Term</th>
              <th>Definition</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${terms.map(item => `
              <tr data-module="${item.module}">
                <td>${item.term}</td>
                <td>${item.definition}</td>
                <td>${item.module === current ? '<span class="term-status term-status--new">New in this module</span>' : '<span class="term-status">Review</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="flashcard-launcher">
          ${current > 1 ? '<p>Flashcards below help you study these new terms.</p>' : ''}
          <button class="flashcard-launcher__btn" data-table="${tableId}" data-current-module="${current}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 4v16"/></svg>
            Study as Flashcards
          </button>
        </div>
      `;
    });
  }
};


/* -------------------------------------------------------
   8. FLASHCARD STUDY MODE
   Extracts terms/definitions from .glossary-table and
   presents a flip-card study interface in a modal overlay.
   ------------------------------------------------------- */
const Flashcards = {
  init() {
    document.querySelectorAll('.flashcard-launcher__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tableId = btn.dataset.table;
        const table = tableId ? document.getElementById(tableId) : btn.closest('section, .content')?.querySelector('.glossary-table') || document.querySelector('.glossary-table');
        if (!table) return;
        const currentModule = btn.dataset.currentModule;

        const terms = [];
        const rows = currentModule ? table.querySelectorAll(`tbody tr[data-module="${currentModule}"]`) : table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 2) {
            terms.push({ term: cells[0].innerHTML.trim(), definition: cells[1].innerHTML.trim() });
          }
        });
        if (terms.length === 0) return;

        this.open(terms);
      });
    });
  },

  open(terms) {
    // Shuffle a copy
    let deck = this.shuffle([...terms]);
    let idx = 0;
    let seen = new Set([0]);

    // Build overlay
    const overlay = document.createElement('div');
    overlay.className = 'flashcard-overlay flashcard-overlay--open';
    overlay.innerHTML = `
      <div class="flashcard-modal">
        <div class="flashcard-modal__header">
          <div>
            <div class="flashcard-modal__title">Flashcard Study Mode</div>
            <div class="flashcard-modal__counter"><span class="fc-current">1</span> of <span class="fc-total">${deck.length}</span></div>
          </div>
          <button class="flashcard-modal__close" aria-label="Close">&times;</button>
        </div>
        <div class="flashcard-modal__body">
          <div class="flashcard" role="button" aria-label="Click to flip card" tabindex="0">
            <div class="flashcard__inner">
              <div class="flashcard__face flashcard__front">
                <div class="flashcard__front-label">Term</div>
                <div class="flashcard__term"></div>
                <div class="flashcard__hint">Click to reveal definition</div>
              </div>
              <div class="flashcard__face flashcard__back">
                <div class="flashcard__back-label">Definition</div>
                <div class="flashcard__definition"></div>
              </div>
            </div>
          </div>
          <div class="flashcard-modal__nav">
            <button class="flashcard-modal__nav-btn fc-prev">&larr; Previous</button>
            <button class="flashcard-modal__nav-btn flashcard-modal__nav-btn--shuffle fc-shuffle">Shuffle</button>
            <button class="flashcard-modal__nav-btn fc-next">Next &rarr;</button>
          </div>
        </div>
        <div class="flashcard-modal__footer"></div>
      </div>
    `;

    document.body.appendChild(overlay);

    const card = overlay.querySelector('.flashcard');
    const termEl = overlay.querySelector('.flashcard__term');
    const defEl = overlay.querySelector('.flashcard__definition');
    const currentEl = overlay.querySelector('.fc-current');
    const footer = overlay.querySelector('.flashcard-modal__footer');

    // Build dots
    deck.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'flashcard-dot' + (i === 0 ? ' flashcard-dot--active flashcard-dot--seen' : '');
      footer.appendChild(dot);
    });
    const dots = footer.querySelectorAll('.flashcard-dot');

    function showCard() {
      card.classList.remove('flashcard--flipped');
      termEl.innerHTML = deck[idx].term;
      defEl.innerHTML = deck[idx].definition;
      currentEl.textContent = idx + 1;
      dots.forEach((d, i) => {
        d.classList.toggle('flashcard-dot--active', i === idx);
        if (seen.has(i)) d.classList.add('flashcard-dot--seen');
      });
    }

    showCard();

    // Flip
    card.addEventListener('click', () => card.classList.toggle('flashcard--flipped'));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flashcard--flipped'); }
    });

    // Nav
    overlay.querySelector('.fc-prev').addEventListener('click', () => {
      idx = (idx - 1 + deck.length) % deck.length;
      seen.add(idx);
      showCard();
    });
    overlay.querySelector('.fc-next').addEventListener('click', () => {
      idx = (idx + 1) % deck.length;
      seen.add(idx);
      showCard();
    });
    overlay.querySelector('.fc-shuffle').addEventListener('click', () => {
      deck = this.shuffle([...deck]);
      idx = 0;
      seen = new Set([0]);
      dots.forEach(d => d.classList.remove('flashcard-dot--seen'));
      showCard();
    });

    // Keyboard nav
    const keyHandler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') { overlay.querySelector('.fc-next').click(); }
      if (e.key === 'ArrowLeft') { overlay.querySelector('.fc-prev').click(); }
      if (e.key === ' ' && document.activeElement !== card) { e.preventDefault(); card.classList.toggle('flashcard--flipped'); }
    };
    document.addEventListener('keydown', keyHandler);

    // Close
    const close = () => {
      document.removeEventListener('keydown', keyHandler);
      overlay.classList.remove('flashcard-overlay--open');
      setTimeout(() => overlay.remove(), 200);
    };
    overlay.querySelector('.flashcard-modal__close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  },

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};


/* -------------------------------------------------------
   8. DRAW GRAPH
   Freehand curve-drawing widget for pedagogical exercises.
   Usage:
     const dg = DrawGraph.create('#container-id', {
       xLabel, yLabel, xDomain, yDomain,
       expectedSlope: 'negative' | 'positive',
       correctLine: x => 5 - 0.1 * x,
       feedbackMessages: { correct, wrongSlope, tooShort }
     });
     dg.submit(feedbackEl);
     dg.clear();
   ------------------------------------------------------- */
const DrawGraph = {

  create(selector, options = {}) {
    const defaults = {
      width: 520,
      height: 380,
      margin: { top: 30, right: 30, bottom: 50, left: 60 },
      xLabel: 'Quantity',
      yLabel: 'Price',
      xDomain: [0, 50],
      yDomain: [0, 5],
      expectedSlope: 'negative',
      correctLine: null,
      feedbackMessages: {
        correct: 'Your curve slopes in the right direction.',
        wrongSlope: 'Check the slope direction.',
        wrongIntercept: 'Your slope direction is right, but the line is not anchored to the correct points.',
        tooShort: 'Try drawing all the way across the graph.'
      }
    };

    const config = { ...defaults, ...options };
    config.curveColor = config.expectedSlope === 'positive' ? '#c0392b' : '#2e86c1';

    const container = document.querySelector(selector);
    if (!container) return null;
    container.innerHTML = '';

    const { width, height, margin } = config;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain(config.xDomain).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain(config.yDomain).range([innerHeight, 0]);

    const svg = d3.select(selector)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('max-width', `${width}px`)
      .style('width', '100%');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Grid lines
    g.append('g').attr('class', 'grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(8).tickSize(-innerHeight).tickFormat(''))
      .selectAll('line').style('stroke', '#e8e8e8').style('stroke-dasharray', '2,2');

    g.append('g').attr('class', 'grid')
      .call(d3.axisLeft(yScale).ticks(8).tickSize(-innerWidth).tickFormat(''))
      .selectAll('line').style('stroke', '#e8e8e8').style('stroke-dasharray', '2,2');

    g.selectAll('.grid .domain').remove();

    // Invisible rect to capture drag events
    const drawArea = g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair');

    // Axes layer (outside clip)
    const axisLayer = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    axisLayer.append('g').attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(8));

    axisLayer.append('g').attr('class', 'axis axis--y')
      .call(d3.axisLeft(yScale).ticks(8));

    axisLayer.selectAll('.axis text')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '12px').style('fill', '#566573');
    axisLayer.selectAll('.axis line, .axis .domain')
      .style('stroke', '#aab7b8');

    // Axis labels
    svg.append('text')
      .attr('x', margin.left + innerWidth / 2).attr('y', height - 8)
      .attr('text-anchor', 'middle')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '14px').style('font-weight', '600').style('fill', '#2c3e50')
      .text(config.xLabel);

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -(margin.top + innerHeight / 2)).attr('y', 16)
      .attr('text-anchor', 'middle')
      .style('font-family', "'Public Sans', sans-serif")
      .style('font-size', '14px').style('font-weight', '600').style('fill', '#2c3e50')
      .text(config.yLabel);

    // State
    let points = [];   // 0, 1, or 2 {x, y} data-space points
    let submitted = false;

    const lineGen = d3.line()
      .x(d => xScale(d.x)).y(d => yScale(d.y));

    // Drawn line (dashed — user's line)
    const drawnPath = g.append('path')
      .attr('fill', 'none')
      .attr('stroke', config.curveColor)
      .attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '8,4')
      .attr('opacity', 0.8);

    // Correct line (hidden until submit)
    const correctPathEl = g.append('path')
      .attr('fill', 'none')
      .attr('stroke', config.curveColor)
      .attr('stroke-width', 3)
      .attr('opacity', 0);

    // Dot group (rendered above paths)
    const dotsGroup = g.append('g').attr('class', 'draw-graph__dots');

    // Extend a line defined by two data-space points to domain edges
    function extendedLinePoints(p1, p2) {
      const [x0, x1] = config.xDomain;
      const slope = (p2.y - p1.y) / (p2.x - p1.x);
      const intercept = p1.y - slope * p1.x;
      return [
        { x: x0, y: slope * x0 + intercept },
        { x: x1, y: slope * x1 + intercept }
      ];
    }

    function redrawUserLine() {
      if (points.length < 2) { drawnPath.attr('d', null); return; }
      drawnPath.attr('d', lineGen(extendedLinePoints(points[0], points[1])));
    }

    function redrawDots() {
      dotsGroup.selectAll('circle').remove();
      points.forEach(p => {
        dotsGroup.append('circle')
          .attr('cx', xScale(p.x)).attr('cy', yScale(p.y))
          .attr('r', 6)
          .attr('fill', config.curveColor)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);
      });
    }

    // Click handler — two-point model
    drawArea.on('click', function(event) {
      if (submitted || points.length >= 2) return;
      const [mx, my] = d3.pointer(event, g.node());
      const cx = Math.max(config.xDomain[0], Math.min(config.xDomain[1], xScale.invert(mx)));
      const cy = Math.max(config.yDomain[0], Math.min(config.yDomain[1], yScale.invert(my)));
      points.push({ x: cx, y: cy });
      redrawDots();
      redrawUserLine();
      if (points.length >= 2) drawArea.style('cursor', 'default');
    });

    return {
      clear() {
        points = [];
        submitted = false;
        drawnPath.attr('d', null);
        correctPathEl.attr('opacity', 0);
        dotsGroup.selectAll('circle').remove();
        g.selectAll('.draw-graph__correct-label').remove();
        drawArea.style('cursor', 'crosshair');
      },

      submit(feedbackEl) {
        if (points.length < 2) {
          feedbackEl.className = 'draw-graph__feedback draw-graph__feedback--warning';
          feedbackEl.innerHTML = '<strong>Place two points first.</strong> Click once to set your first endpoint, then click again to set the second.';
          return;
        }

        const [p1, p2] = points;
        const domainWidth = config.xDomain[1] - config.xDomain[0];
        const coverage = Math.abs(p2.x - p1.x) / domainWidth;

        if (coverage < 0.4) {
          feedbackEl.className = 'draw-graph__feedback draw-graph__feedback--warning';
          feedbackEl.innerHTML = '<strong>Try spanning more of the graph.</strong> ' + config.feedbackMessages.tooShort;
          return;
        }

        const slope = (p2.y - p1.y) / (p2.x - p1.x);
        const slopeDir = slope > 0 ? 'positive' : 'negative';
        const intercept = p1.y - slope * p1.x;
        const userLine = x => slope * x + intercept;
        let isCorrect = slopeDir === config.expectedSlope;

        if (config.correctLine) {
          const [x0, x1] = config.xDomain;
          const samples = 6;
          const diffs = [];
          for (let i = 0; i <= samples; i++) {
            const x = x0 + ((x1 - x0) * i / samples);
            const expectedY = config.correctLine(x);
            const userY = userLine(x);
            if (isFinite(expectedY) && isFinite(userY)) {
              diffs.push(Math.abs(expectedY - userY));
            }
          }
          if (diffs.length) {
            const meanAbsDiff = diffs.reduce((sum, diff) => sum + diff, 0) / diffs.length;
            const yRange = config.yDomain[1] - config.yDomain[0];
            isCorrect = isCorrect && (meanAbsDiff / yRange) < 0.12;
          }
        }

        submitted = true;
        drawArea.style('cursor', 'default');

        // Show correct line
        if (config.correctLine) {
          const [x0, x1] = config.xDomain;
          const pts = [];
          for (let x = x0; x <= x1; x += (x1 - x0) / 100) {
            const y = config.correctLine(x);
            if (y >= config.yDomain[0] && y <= config.yDomain[1]) pts.push({ x, y });
          }
          correctPathEl.attr('d', lineGen(pts)).attr('opacity', 1).attr('stroke-dasharray', null);

          const lastPt = pts[pts.length - 1];
          g.append('text').attr('class', 'draw-graph__correct-label')
            .attr('x', xScale(lastPt.x) + 8).attr('y', yScale(lastPt.y) + 4)
            .style('font-family', "'Public Sans', sans-serif")
            .style('font-size', '13px').style('font-weight', '700')
            .style('fill', config.curveColor)
            .text(config.expectedSlope === 'negative' ? 'D' : 'S');
        }

        if (isCorrect) {
          feedbackEl.className = 'draw-graph__feedback draw-graph__feedback--correct';
          feedbackEl.innerHTML = '<strong>Great job!</strong> ' + config.feedbackMessages.correct;
        } else {
          feedbackEl.className = 'draw-graph__feedback draw-graph__feedback--incorrect';
          const diagnosis = slopeDir !== config.expectedSlope
            ? config.feedbackMessages.wrongSlope
            : config.feedbackMessages.wrongIntercept;
          feedbackEl.innerHTML = '<strong>Not quite.</strong> ' + diagnosis +
            ' The correct curve is shown in the graph above.';
        }
      }
    };
  }
};


/* -------------------------------------------------------
   INITIALIZATION
   ------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  SidebarNav.init();
  CheckUnderstanding.init();
  SelfCheck.init();
  CumulativeGlossary.init();
  Flashcards.init();
});
