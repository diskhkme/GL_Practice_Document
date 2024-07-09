#pragma once

#include <string>

class Texture
{
private:
	unsigned int texObject; 
	std::string filePath;    
	unsigned char* texBuffer; 
	int width, height, channel; 
public:
	Texture(const std::string& path);
	~Texture();

	void Bind(unsigned int slot = 0) const; 
	void Unbind() const;

	inline int GetWidth() const { return width; }
	inline int GetHeight() const { return height; }
};