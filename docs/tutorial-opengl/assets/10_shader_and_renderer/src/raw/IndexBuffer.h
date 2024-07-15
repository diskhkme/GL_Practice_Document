#pragma once

class IndexBuffer
{
private:
	unsigned int ibo;
	unsigned int count; // ������ ����(byte size�� �ƴԿ� ����)
public:
	IndexBuffer(const unsigned int* data, unsigned int count); 
	~IndexBuffer();

	void Bind() const;
	void Unbind() const;

	inline unsigned int GetCount() const { return count; }
};