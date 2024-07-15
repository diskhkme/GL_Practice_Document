#pragma once

class IndexBuffer
{
private:
	unsigned int ibo;
	unsigned int count; // 정점의 개수(byte size가 아님에 유의)
public:
	IndexBuffer(const unsigned int* data, unsigned int count); 
	~IndexBuffer();

	void Bind() const;
	void Unbind() const;

	inline unsigned int GetCount() const { return count; }
};