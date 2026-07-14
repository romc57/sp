/**
 * Hand-authored SP articles (portfolio / company narrative).
 * Merged with autopilot write-back in articles.js.
 *
 * @typedef {import('./articles.js').SiteArticle} SiteArticle
 */

/** @type {SiteArticle[]} */
export const CURATED_ARTICLES = [
  {
    slug: 'bishvilnu-software-principle-challenge-solved',
    title: "Bishvilnu's challenge, and how Software Principle solved it",
    h1: "Bishvilnu's challenge, and how Software Principle solved it",
    metaDescription:
      'Bishvilnu, a volunteer-led organization, needed to run guided growth programs for many people at once without an engineering team of its own. Here is the challenge Software Principle solved, and how.',
    htmlBody: `<p><a href="https://www.linkedin.com/company/bishvilenu" target="_blank" rel="noopener noreferrer">Bishvilnu</a> is a volunteer-led organization that guides people through structured personal-growth programs — a caretaker checks in, but people need support between those check-ins too. Software Principle built and still provides the product behind that work.</p>

<h2>The challenge</h2>
<p>A volunteer organization can run great programs, but it can't run an engineering team. Bishvilnu needed something a business buyer would recognize immediately: a real product, not an open-ended project that would need a team to keep alive. That meant three problems to solve at once, not one.</p>
<p>First, every participant's journey is personal — data for one person, one group, one organization can never leak into another's view, and that has to hold even as the organization grows. Second, the people involved aren't uniform: a participant, the caretaker who runs their group, and whoever oversees the organization as a whole all need different access to the same system, correctly, every time. Third, if this worked for Bishvilnu, other organizations with the same need would want it too — without Software Principle rebuilding it from scratch for each one.</p>

<h2>How Software Principle solved it</h2>
<p>Instead of a one-off build for Bishvilnu alone, Software Principle delivered one platform that any organization can run on, with each organization's data fully isolated from the next. Onboarding the next organization became a configuration step, not a new project — the same product, the same standards, without starting over.</p>
<p>Roles were modeled on how the work actually happens, not on generic admin/user boxes: a participant works inside their own journey, a caretaker oversees the group they run, and an organization administrator sees their whole organization — nothing more. Every one of those boundaries is checked on the server for each request, so access follows the role even if the interface doesn't ask.</p>
<p>The whole thing runs on managed cloud infrastructure rather than a server Bishvilnu would have to maintain — compute that scales itself with demand, an encrypted database, isolated file storage, and a scheduled job for the routine work that shouldn't need a person watching it.</p>
<ul class="tech-list">
  <li>Serverless, auto-scaling compute</li>
  <li>Isolated data per organization</li>
  <li>Encrypted managed database</li>
  <li>Scheduled background processing</li>
  <li>Web + mobile clients</li>
</ul>
<p>One more piece closes the gap between caretaker check-ins: an AI guide built into the product itself, so a participant has somewhere to turn on their own path, not only when a human caretaker is available.</p>

<h2>The outcome</h2>
<p>Bishvilnu got a product it subscribes to, not a project it has to maintain — Software Principle remains the provider, handling support and scale. And because the underlying platform was built to hold more than one organization from day one, the same solution is now available to others facing the same problem; see <a href="../products">products and customers we deliver for</a> and <a href="../how-it-works">how Software Principle creates and scales products</a> for the full process.</p>`,
  },
]
