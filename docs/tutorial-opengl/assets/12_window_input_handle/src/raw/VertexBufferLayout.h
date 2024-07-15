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
	//�ϳ��� layout�� �������� element�� ���� ����(ex, position, normal, color, etc...)
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
		stride += count * VertexBufferElement::GetSizeOfType(GL_FLOAT); //vertex �ϳ��� float �����Ͱ� count�� �߰��ɼ���, count * size(GL_FLOAT)�� stride�� Ŀ���� ��
	}

	template<>
	void Push<unsigned int>(unsigned int count)
	{
		elements.push_back(VertexBufferElement{ GL_UNSIGNED_INT, count, GL_FALSE });
		stride += count * VertexBufferElement::GetSizeOfType(GL_UNSIGNED_INT); //���� ��������
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