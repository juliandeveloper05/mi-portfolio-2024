import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import { ResumeData } from '@/data/resumeData';

const ACCENT = '#6366f1';
const TEXT_PRIMARY = '#111827';
const TEXT_SECONDARY = '#6b7280';
const TEXT_MUTED = '#9ca3af';
const BG_SECTION = '#f9fafb';
const BORDER_COLOR = '#e5e7eb';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: TEXT_PRIMARY,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    backgroundColor: '#ffffff',
  },
  // Header
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    color: ACCENT,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: TEXT_SECONDARY,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactItem: {
    fontSize: 9,
    color: TEXT_SECONDARY,
  },
  contactLink: {
    fontSize: 9,
    color: ACCENT,
    textDecoration: 'none',
  },
  // Section
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
  },
  // Bio
  bioText: {
    fontSize: 10,
    color: TEXT_SECONDARY,
    lineHeight: 1.6,
    marginBottom: 5,
  },
  // Skills
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillBadge: {
    backgroundColor: BG_SECTION,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderStyle: 'solid',
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontSize: 9,
    color: TEXT_PRIMARY,
  },
  // Experience / Education
  entryContainer: {
    marginBottom: 10,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_PRIMARY,
    flex: 1,
  },
  entryPeriod: {
    fontSize: 9,
    color: TEXT_MUTED,
    marginLeft: 8,
  },
  entrySubtitle: {
    fontSize: 9,
    color: ACCENT,
    marginBottom: 3,
  },
  entryDescription: {
    fontSize: 9,
    color: TEXT_SECONDARY,
    lineHeight: 1.5,
  },
  // Projects
  projectContainer: {
    marginBottom: 8,
    backgroundColor: BG_SECTION,
    borderRadius: 4,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
    borderLeftStyle: 'solid',
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: TEXT_PRIMARY,
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9,
    color: TEXT_SECONDARY,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  projectTech: {
    fontSize: 8,
    color: ACCENT,
  },
});

interface ResumeDocumentProps {
  data: ResumeData;
}

const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document
    title={`${data.name} - CV`}
    author={data.name}
    subject="Curriculum Vitae"
    creator="Portfolio PDF Generator"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{data.email}</Text>
          <Link style={styles.contactLink} src={`https://${data.linkedin}`}>
            {data.linkedin}
          </Link>
          <Link style={styles.contactLink} src={`https://${data.github}`}>
            {data.github}
          </Link>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        {data.bio.map((paragraph, i) => (
          <Text key={i} style={styles.bioText}>
            {paragraph}
          </Text>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsRow}>
          {data.skills.map((skill) => (
            <Text key={skill} style={styles.skillBadge}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{exp.role}</Text>
              <Text style={styles.entryPeriod}>{exp.period}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{exp.company}</Text>
            <Text style={styles.entryDescription}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{edu.title}</Text>
              <Text style={styles.entryPeriod}>{edu.period}</Text>
            </View>
            <Text style={styles.entrySubtitle}>{edu.institution}</Text>
            <Text style={styles.entryDescription}>{edu.description}</Text>
          </View>
        ))}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Projects</Text>
        {data.projects.map((project, i) => (
          <View key={i} style={styles.projectContainer}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
            <Text style={styles.projectTech}>{project.tech}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
