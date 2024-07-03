#include "VertexArray.h"
#include <GL/glew.h>

VertexArray::VertexArray()
{
	glGenVertexArrays(1, &vao); 
}

VertexArray::~VertexArray()
{
	glDeleteVertexArrays(1, &vao);
}

void VertexArray::AddBuffer(const VertexBuffer& vb, const VertexBufferLayout& layout)
{
	Bind(); // vao ���ε�
	vb.Bind(); // vbo ���ε�

	// VAO�� VBO�� ���ε� �� ���¿��� ��Ʈ����Ʈ ����
	const auto& elements = layout.GetElement();
	unsigned int offset = 0;
	for (int i = 0; i < elements.size(); i++)
	{
		const auto& element = elements[i];
		glEnableVertexAttribArray(i); 
		glVertexAttribPointer(i, element.count, element.type, element.normalized, layout.GetStride(), (const void*)offset);
		offset += element.count * VertexBufferElement::GetSizeOfType(element.type);
	}
}

void VertexArray::Bind() const
{
	glBindVertexArray(vao);
}

void VertexArray::Unbind() const
{
	glBindVertexArray(0);
}