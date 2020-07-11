import React from "react"
import Header from '../components/Header'
import { Helmet } from "react-helmet"
import Research from "../img/research.svg"

const projects = [
	{
		"name": "Efficient Microservices with Elastic Containers (Poster)",
    	"description": "A system to vertically autoscale docker containers at runtime. Published in CoNEXT 2019.",
   },
   {
       "name": "XDP + Serverless Computing",
       "description": "An investigation into whether AF_XDP sockets can be used to accelerate serverless workloads.",
       "repo": "https://github.com/CU-CSCI7000-Fall2019/final-project-csci7000-xdp-serverless",
   }
]

const ResearchPage = () => {
  return (
    <section className="section" style={{"paddingTop": "1rem"}}>
    <Helmet>
          <meta charSet="utf-8" />
          <title>Research</title>
        </Helmet>
    <div className="container">
        <div className="columns">
            <div className="column is-one-sixth"> </div>
            <div className="column is-three-fifths">  
                <Header />
                <div class="level-item has-text-centered">
                    <figure className="image is-128x128 is-inline-block">
                        <img class="is-square" src={Research} alt="Me"  />
                    </figure>
                </div>
                <h1 className="title"> My Research </h1>
                <p>
                    I'm a graduate student at the University of Illinois at Urbana-Champaign in the Systems Platform Research Group under Professor <a href="https://jianh.web.engr.illinois.edu/"> Jian Huang</a>.
                    I'm interested in co-designing the software + hardware stack to accelerate applications in data centers.
                    <br /> 
                    <br /> 
                    My Google Scholar profile can be found at this <a href="https://scholar.google.com/citations?user=is4Ka1cAAAAJ&hl=en"> link</a>. 
                </p>
                <br />
                <h1 className="subtitle"> Projects </h1>
            </div>
            <div className="column is-one-sixth"></div>
        </div>
        <div className="columns is-multiline">
            {projects.map(project => (
              <div className="column is-one-third">
                <div className="box">
                  <p style={{fontWeight: 600, marginBottom: '0.25rem'}}>{project.name}</p>
                  <p style={{fontSize: "0.85rem", marginBottom: "0.5rem", marginTop: "0.1rem"}}>
                    {project.description}
                  </p>
                  <p>
                  {project.demo && <a style={{marginRight: "0.75rem"}} href={project.demo}>Demo</a>}
                  {project.paper && <a style={{marginRight: "0.75rem"}} href={project.paper}>Paper</a>}
                  {project.repo && <a style={{marginRight: "0.75rem"}} href={project.repo}>Source</a>}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="columns">
            <div className="column is-one-sixth"> </div>
            <div className="column is-three-fifths">  
            <div class="level-item has-text-centered">
            Header icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>.
            </div>
            </div>
            <div className="column is-one-sixth"> </div>
        </div>
    </div>
</section>
  );
}

export default ResearchPage
