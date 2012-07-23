#include <unistd.h>
#include <assert.h>
int main (int argc, char** argv) {
  assert(argc > 1);
  return execlp(
    "node",
    "node",
    NODE_BENCH,
    argv[argc - 1],
    (char *)0
  );
}
