<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" encoding="iso-8859-1" indent="no"/>
	
	<xsl:template match="channel">
		<xsl:apply-templates select="item[1]" />
	</xsl:template>

	<xsl:template match="item">
		<h3>
			<xsl:value-of select="title"/>
		</h3>
		<div class="line"></div>
		<p>
			<xsl:value-of select="description"/>
		</p>
		<a class="button" target="_blank">
			<xsl:attribute name="href">
				<xsl:value-of select="link"/>
			</xsl:attribute>
			Read more
		</a>
	</xsl:template>
</xsl:stylesheet>
