import * as React from "react";
import { graphql } from "gatsby";

// import Bio from "../components/Bio"
import PostLayout from "../components/PostLayout";
import Seo from "../components/seo";
import ProjectBox from "../blog-components/ProjectBox";

const PostIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const projects = data.allMarkdownRemark.nodes

  // if there are no posts, display a message
  if (projects.length === 0) {
    return (
      <PostLayout location={location} title={siteTitle}>
        {/* <Bio /> */}
        <p>
          No posts found.
        </p>
      </PostLayout>
    )
  }

  // if there are posts, display them in a grid
  return (

    <PostLayout location={location} title={siteTitle}>
      <div className="project-grid">
        {projects.map(project => (
          <ProjectBox key={project.fields.slug} project={project} />
        ))}
      </div>
      <p style={{ color: "#AAA", textAlign: "center" }}>
        The projects have been reorganized for application purposes. Further details will be updated soon.
      </p>
      {/* <Bio /> */}
    </PostLayout>
  )
}

export default PostIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { featured: { eq: true } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {

          title
          description
          keywords
          featured
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED),
            }
          }
        }
      }
    }
  }
`

// sort: { frontmatter: { date: DESC } } // in allMarkdownRemark
// date(formatString: "MMMM DD, YYYY") // in frontmatter