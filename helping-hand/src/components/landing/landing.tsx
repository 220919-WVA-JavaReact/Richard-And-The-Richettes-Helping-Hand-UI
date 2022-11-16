import './landing.css';




function Landing(){
    return(
        <div className="hero min-h-screen" style={{ backgroundImage: `url("https://res.cloudinary.com/dzjkwepju/image/upload/v1668618130/for_funsies/crazy-workman-driving-lawn-mower-18027059_pi7qgu.jpg")` }}>
  <div className="hero-overlay bg-opacity-20"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-l" id='landing-text'>
      <h1 className="mb-5 text-5xl font-bold text-white">Welcome to Helping Hand!</h1>
      <p className="mb-7 text-4xl text-white">Need a hand? Or maybe you have a hand to lend.<br/>Sign up Today!</p>
      <p className='mb-7 text-white'>No one is useless in this world who lightens the burdens of another.</p>
    </div>
  </div>
</div>
    )
}

export default Landing;
