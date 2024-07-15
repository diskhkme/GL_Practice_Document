#pragma once

#include <vector>
#include <cassert>
#include <GL/glew.h>

struct VertexBufferElement
{
	unsigned int type; 
	unsigned int count;
	bool normalized;

	static unsigned int GetSizeOfType(unsigned int type)
	{
		switch (type)
		{
			case GL_FLOAT: return 4;
			case GL_UNSIGNED_INT: return 4;
			case GL_UNSIGNED_BYTE: return 1;
		}
		return 0;
	}
};

class VertexBufferLayout
{
private:
	//하나의 layout은 여러개의 element를 갖고 있음(ex, position, normal, color, etc...)
	std::vector<VertexBufferElement> elements; 
	unsigned int stride; 

public:
	VertexBufferLayout()
		: stride{ 0 }
	{}

	template<typename T>
	void Push(unsigned int count)
	{
		assert(false);
	}

	//template specializations
	template<>
	void Push<float>(unsigned int count)
	{
		elements.push_back(VertexBufferElement{ GL_FLOAT, count, GL_FALSE });
		stride += count * VertexBufferElement::GetSizeOfType(GL_FLOAT); //vertex 하나당 float 데이터가 count개 추가될수록, count * size(GL_FLOAT)씩 stride가 커져야 함
	}

	template<>
	void Push<unsigned int>(unsigned int count)
	{
		elements.push_back(VertexBufferElement{ GL_UNSIGNED_INT, count, GL_FALSE });
		stride += count * VertexBufferElement::GetSizeOfType(GL_UNSIGNED_INT); //위와 마찬가지
	}

	template<>
	void Push<unsigned char>(unsigned int count)
	{
		elements.push_back(VertexBufferElement{ GL_UNSIGNED_BYTE, count, GL_TRUE });
		stride += count * VertexBufferElement::GetSizeOfType(GL_UNSIGNED_BYTE);
	}

	inline const std::vector<VertexBufferElement>& GetElement() const { return elements; }
	inline unsigned int GetStride() const { return stride; }
};