import React from "react"
import Header from "../components/Header"
import { Helmet } from "react-helmet"
import teaching from "../img/teaching.svg"

const eng_experiences = [
	{
		"name": "ECEN 4610/4620 - ECE Senior Design (2018-2019), (2019-2020)",
    	"description": "Lead teams of 4-6 students through a complete embedded systems design cycle, from identifying and defining product requirements through design reviews,  tiers of testing with the end goal of having a working product ready to release to public and/or delivered to project sponsor.",
   },
   {
       "name": "Engineering Fellow (2016-2017), (2017-2018), (2018-2019)",
       "description": "Selected to promote academic excellence in the College of Engineering and Applied Science. Regarded as one of the college’s highest honors. Led exam review sessions and homework office hours",
   }
]

const lead_experiences = [
	{
		"name": "LEAD 4000 - Leadership Capstone",
    	"description": "Lead teams of 4 students through a leadership exercise of working with local community partners to identify and address leadership challenges within the organization.",
   },
   {
       "name": "LEAD 1000 - Introduction to Leadership",
       "description": "Led discussions with college athletes + students on leadership techniques in personal, professional and academic settings.",
   }
]


const TeachingPage = () => {
  return (
    <section className="section" style={{ paddingTop: "1rem" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Teaching</title>
      </Helmet>
      <div className="container">
        <div className="columns">
          <div className="column is-one-sixth"> </div>
          <div className="column is-three-fifths">
            <Header />
            <div class="level-item has-text-centered">
              <figure className="image is-128x128 is-inline-block">
                <img class="is-square" src={teaching} alt="Me" />
              </figure>
            </div>
            <h1 className="title"> Teaching </h1>
            <p>
              During my time as a student at CU Boulder, I was a TA for a
              couple of classes which gave me outstanding teaching experience. 
              I am also tutor for a handful of high school + undergraduate students 
              and so if you have any questions, please don't hesitate to reach out. 
            </p>
            <br />
            <h1 className="subtitle"> TA Experience </h1>
            <p><strong> Engineering</strong></p>

            {eng_experiences.map(experience => (
                <div className="box">
                  <p style={{fontWeight: 600, marginBottom: '0.25rem'}}>{experience.name}</p>
                  <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>
                    {experience.description}
                  </p>
                </div>
            ))}

            <br />
            <p><strong>Leadership</strong></p>

            {lead_experiences.map(experience => (
                <div className="box">
                  <p style={{fontWeight: 600, marginBottom: '0.25rem'}}>{experience.name}</p>
                  <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>
                    {experience.description}
                  </p>
                </div>
            ))}

          </div>
          <div className="column is-one-sixth"></div>
        </div>
      </div>
    </section>
  )
}

export default TeachingPage
