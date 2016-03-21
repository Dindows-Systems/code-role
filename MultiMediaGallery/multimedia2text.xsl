<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="text" encoding="iso-8859-1" indent="no"/>

	<xsl:variable name="limit_r" select="$cursor + $req"/>
	
	<xsl:template match="MultimediaGallery">
		<xsl:text>[</xsl:text>
		<xsl:apply-templates select="//file[position() &gt; $cursor and position() &lt; $limit_r + 1]" />
		<xsl:text>]</xsl:text>
	</xsl:template>

	<xsl:template match="file">
		<xsl:text>{</xsl:text>
		
		<xsl:text>"thumb":</xsl:text>
		<xsl:text>"</xsl:text>
		<xsl:value-of select="thumb"/>
		<xsl:text>"</xsl:text>
		<xsl:text>,</xsl:text>
		
		<xsl:text>"sources":</xsl:text>
		<xsl:text>[</xsl:text>
		<xsl:for-each select="source">
			<xsl:text>{</xsl:text>
			<xsl:text>"source":</xsl:text>
			<xsl:text>"</xsl:text>
			<xsl:value-of select="."/>
			<xsl:text>"</xsl:text>
			<xsl:text>}</xsl:text>
			<xsl:text>,</xsl:text>
		</xsl:for-each>
		<xsl:text>]</xsl:text>
		<xsl:text>,</xsl:text>
		
		<xsl:text>"type":</xsl:text>
		<xsl:text>"</xsl:text>
		<xsl:value-of select="@type"/>
		<xsl:text>"</xsl:text>
		<xsl:text>,</xsl:text>
		
		<xsl:text>"description":</xsl:text>
		<xsl:text>"</xsl:text>
		<xsl:value-of select="description"/>
		<xsl:text>"</xsl:text>
		
		<xsl:text>}</xsl:text>
		<xsl:text>,</xsl:text>
	</xsl:template>
</xsl:stylesheet>
